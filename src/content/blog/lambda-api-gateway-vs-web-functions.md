---
title: "API Gateway + Lambda vs Lambda Web Functions"
description: "The same tiny HTTP API deployed twice with AWS CDK: the classic API Gateway + Lambda setup and the newer Lambda Web Function with a built-in HTTPS endpoint."
pubDate: 2026-11-10
tags: ["aws", "lambda", "cdk", "serverless"]
---

For years, exposing a Lambda function over HTTP meant putting **API Gateway** in front of it. Lambda now has another option: **Web Functions**, where the function itself is a plain HTTP server and gets its own HTTPS endpoint.

To compare them honestly I built the same API twice, with the same three routes, and deployed each one with AWS CDK in TypeScript.

> This is a structural comparison of what you write and what you deploy. I did not benchmark latency, cold starts or cost, so I make no claims about them.

## The shared contract

Both implementations expose:

| Route | Response |
| --- | --- |
| `GET /health` | `{ "status": "ok", "pattern": "..." }` |
| `GET /hello?name=Ada` | `{ "message": "Hello, Ada!", ... }` |
| `GET /` | Method, path and request id |
| anything else | `404` |

The `pattern` field in each response tells you which stack answered.

## Pattern 1: API Gateway + Lambda (legacy)

The handler receives an **event** and returns a response object. API Gateway does the HTTP work and translates it into that event.

```js
exports.handler = async (event) => {
  const method = event.requestContext?.http?.method ?? 'GET';
  const path = event.rawPath ?? '/';

  if (path === '/health') {
    return json(200, { status: 'ok', pattern: 'api-gateway' });
  }
  // ...
  return json(404, { message: `No route for ${method} ${path}` });
};
```

The infrastructure is a function, an HTTP API, two catch-all routes and a stage:

```ts
const handler = new lambda.Function(this, 'Handler', {
  runtime: lambda.Runtime.NODEJS_22_X,
  architecture: lambda.Architecture.ARM_64,
  handler: 'index.handler',
  code: lambda.Code.fromAsset(path.join(__dirname, '..', 'src', 'legacy-api')),
});

const api = new apigwv2.HttpApi(this, 'HttpApi', { createDefaultStage: false });
api.addRoutes({ path: '/{proxy+}', methods: [apigwv2.HttpMethod.ANY], integration });
```

Routing, throttling and the public URL all live in API Gateway.

## Pattern 2: Lambda Web Function

There is no event and no `handler` export. The code is an ordinary Node.js HTTP server that listens on the address Lambda gives it:

```js
const http = require('node:http');

const [host, port] = (process.env.AWS_LAMBDA_HTTP_ENDPOINT ?? 'localhost:3000').split(':');

const server = http.createServer((req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
  if (url.pathname === '/health') {
    return json(res, 200, { status: 'ok', pattern: 'web-function' });
  }
  // ...
});

server.listen(Number(port), host);
```

The handler is now just standard `node:http`. You could run it locally with `node index.js` and talk to it with `curl`, which is a big win for development.

On the infrastructure side the model is different. Instead of one function resource, there are three:

1. **`WebFunction`**: the named function.
2. **`WebFunctionRevision`**: an immutable revision holding the code (from S3), the runtime (`nodejs24.x`), timeout, concurrency per environment and logging.
3. **`WebFunctionEndpoint`**: the public HTTPS endpoint, with weights across revisions and its own throttling and scaling limits.

```ts
const endpoint = new lambda.CfnWebFunctionEndpoint(this, 'Endpoint', {
  functionName: webFunction.functionName,
  endpointName: 'prod',
  endpointType: 'HomeRegion',
  authType: 'ApplicationManaged',
  revisionWeights: [{ revisionId: revision.attrRevisionId, weight: 100 }],
  scalingConfig: { maxEnvironments: 5 },
  throttleConfig: { rateLimit: 100 },
});
```

`revisionWeights` is the interesting part: shifting traffic between revisions is a first-class concept of the endpoint, not something you bolt on with aliases.

## Side by side

| | API Gateway + Lambda | Lambda Web Function |
| --- | --- | --- |
| Handler shape | `exports.handler(event)` | Plain HTTP server |
| Request model | API Gateway event | Standard `req` / `res` |
| HTTP front door | API Gateway HTTP API | Built-in endpoint |
| Services to deploy | Lambda + API Gateway | Lambda only |
| Deploy unit | Function version | Immutable revision |
| Traffic shifting | Aliases | `revisionWeights` on the endpoint |
| Throttling | Stage settings | Endpoint `throttleConfig` |
| Auth | API Gateway authorizers | `ApplicationManaged`: your code decides |
| Local development | Needs an event or an emulator | `node index.js` |
| CDK support | L2 constructs | L1 (`Cfn*`) constructs only |

## Gotchas I ran into

- **L1 only.** There are no high-level CDK constructs for Web Functions yet, so you wire the three resources and their dependencies yourself.
- **Code lives in S3.** The revision reads its code from a bucket, so the stack needs a versioned bucket, a bucket policy that lets the Lambda service read it, and an explicit dependency so the revision is not created before that policy exists.
- **Unknown resource types.** CDK's CloudFormation validator prints `Unknown resource type 'AWS::Lambda::WebFunction'` warnings. They are warnings, not failures, but expect the noise.
- **`ApplicationManaged` auth** means the endpoint does not authenticate callers for you. If you move from API Gateway, you lose its built-in authorizers and need to handle that in your code.

## Testing both

Because the Web Function is just an HTTP server, I could test it with a real request. The test starts the server on a random port and calls it with `fetch`. The legacy handler is tested by calling the function with a fake event. Same assertions, two very different shapes:

```ts
test('GET /health returns ok', async () => {
  const res = await fetch(`${base}/health`);
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ status: 'ok', pattern: 'web-function' });
});
```

The stacks themselves are covered with CDK's `Template` assertions (resource counts, runtime, endpoint type, bucket policy).

## Takeaways

- If you already run API Gateway and rely on its authorizers, usage plans or request validation, there is no reason to move just for novelty.
- If you want a plain HTTP server, fewer moving pieces and revision-based traffic shifting, Web Functions are worth a serious look.
- Either way, keep the business logic out of the transport layer. That is what made porting the same three routes between both patterns trivial.
