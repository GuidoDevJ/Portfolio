# Por qué apareció `AccessDenied` y cómo se resolvió

## El problema en simple

CloudFront intentó leer un archivo del bucket S3, y S3 le respondió **"no tenés permiso"**.

Esto pasa porque S3 tiene el acceso público **bloqueado** — solo CloudFront puede leerlo, pero para eso el bucket necesita una **política explícita** que lo autorice.

---

## Qué es OAC

**Origin Access Control (OAC)** es el mecanismo que le dice a S3:
> "Solo dejá pasar requests que vengan firmadas por esta distribución de CloudFront específica."

Funciona así:

```
Usuario → CloudFront → (firma el request con SigV4) → S3 ✅
Usuario → S3 directo → ❌ Access Denied
```

---

## Por qué falló

Creamos el OAC como un recurso **explícito** y se lo pasamos a CDK así:

```typescript
const oac = new cloudfront.S3OriginAccessControl(this, 'OAC', { ... });

origins.S3BucketOrigin.withOriginAccessControl(assetsBucket, {
  originAccessControl: oac,  // ← OAC propio
})
```

Cuando CDK recibe un OAC **propio** (en lugar de crear uno internamente), **no agrega automáticamente el bucket policy**. El OAC queda configurado en CloudFront, pero S3 nunca recibe la instrucción de confiar en él.

---

## La solución

Agregar el bucket policy **manualmente** después de crear la distribución:

```typescript
assetsBucket.addToResourcePolicy(
  new iam.PolicyStatement({
    actions: ['s3:GetObject'],
    resources: [assetsBucket.arnForObjects('*')],
    principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
    conditions: {
      StringEquals: {
        // Solo esta distribución específica puede leer del bucket
        'AWS:SourceArn': `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`,
      },
    },
  })
);
```

---

## Resumen

| | Sin bucket policy | Con bucket policy |
|---|---|---|
| CloudFront → S3 | ❌ Access Denied | ✅ OK |
| Usuario → S3 directo | ❌ Bloqueado | ❌ Bloqueado |
| Usuario → CloudFront | ❌ Access Denied | ✅ OK |
