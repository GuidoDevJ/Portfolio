import * as cdk from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import * as path from 'path';

export class PortfolioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ── S3: static Astro site ──────────────────────────────────────────────
    const assetsBucket = new s3.Bucket(this, 'AssetsBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // ── Lambdas ────────────────────────────────────────────────────────────

    const lockFile = path.resolve(__dirname, '../../infra/package-lock.json');

    const contactFn = new NodejsFunction(this, 'ContactFunction', {
      entry: path.resolve(__dirname, '../lambdas/contact/index.ts'),
      depsLockFilePath: lockFile,
      runtime: lambda.Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(30),
      environment: {
        RESEND_API_KEY: process.env.RESEND_API_KEY ?? '',
        RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL ?? '',
      },
    });

    const chatFn = new NodejsFunction(this, 'ChatFunction', {
      entry: path.resolve(__dirname, '../lambdas/chat/index.ts'),
      depsLockFilePath: lockFile,
      runtime: lambda.Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(30),
      environment: {
        CHAT_API_URL: process.env.CHAT_API_URL ?? '',
        CHAT_API_KEY: process.env.CHAT_API_KEY ?? '',
      },
    });

    const contactUrl = contactFn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });
    const chatUrl = chatFn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    // ── CloudFront ─────────────────────────────────────────────────────────

    // Extracts the hostname from a Lambda Function URL (https://<id>.lambda-url.<region>.on.aws/)
    function lambdaOrigin(fnUrl: lambda.FunctionUrl): origins.HttpOrigin {
      return new origins.HttpOrigin(
        cdk.Fn.select(2, cdk.Fn.split('/', fnUrl.url)),
        { protocolPolicy: cloudfront.OriginProtocolPolicy.HTTPS_ONLY }
      );
    }

    function apiBehavior(
      fnUrl: lambda.FunctionUrl
    ): cloudfront.BehaviorOptions {
      return {
        origin: lambdaOrigin(fnUrl),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
        originRequestPolicy:
          cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
      };
    }

    // OAC: only CloudFront can read from S3 via SigV4-signed requests.
    // SIGV4_NO_OVERRIDE signs every request without overwriting an existing
    // Authorization header (correct for public read-only assets).
    const oac = new cloudfront.S3OriginAccessControl(this, 'OAC', {
      description: 'Portfolio static assets OAC',
      signing: cloudfront.Signing.SIGV4_NO_OVERRIDE,
    });

    // S3 REST endpoint (required for OAC) doesn't support directory indexing.
    // This CloudFront Function rewrites /path/ → /path/index.html at the edge
    // so S3 knows which object to serve.
    const indexRewrite = new cloudfront.Function(this, 'IndexRewrite', {
      code: cloudfront.FunctionCode.fromInline(`
        function handler(event) {
          var uri = event.request.uri;
          if (uri.endsWith('/')) {
            event.request.uri += 'index.html';
          } else if (!uri.split('/').pop().includes('.')) {
            event.request.uri += '/index.html';
          }
          return event.request;
        }
      `),
      runtime: cloudfront.FunctionRuntime.JS_2_0,
    });

    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(assetsBucket, {
          originAccessControl: oac,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        functionAssociations: [{
          function: indexRewrite,
          eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
        }],
      },
      additionalBehaviors: {
        '/api/contact*': apiBehavior(contactUrl),
        '/api/chat*': apiBehavior(chatUrl),
      },
    });

    // Explicit bucket policy: only this CloudFront distribution can read from S3.
    // Required when passing a custom OAC — CDK doesn't add this automatically in that case.
    assetsBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [assetsBucket.arnForObjects('*')],
        principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
        conditions: {
          StringEquals: {
            'AWS:SourceArn': `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`,
          },
        },
      })
    );

    // ── Deploy dist/ to S3 + invalidate CloudFront on every deploy ─────────
    new s3deploy.BucketDeployment(this, 'Deploy', {
      sources: [s3deploy.Source.asset(path.resolve(__dirname, '../../dist'))],
      destinationBucket: assetsBucket,
      distribution,
      distributionPaths: ['/*'],
    });

    // ── Outputs ────────────────────────────────────────────────────────────
    new cdk.CfnOutput(this, 'DistributionUrl', {
      value: `https://${distribution.distributionDomainName}`,
      description: 'Portfolio URL',
    });
  }
}
