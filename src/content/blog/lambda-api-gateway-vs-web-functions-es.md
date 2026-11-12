---
title: "API Gateway + Lambda vs Lambda Web Functions"
description: "La misma API HTTP mínima desplegada dos veces con AWS CDK: el esquema clásico de API Gateway + Lambda y la nueva Lambda Web Function con endpoint HTTPS integrado."
pubDate: 2026-11-10
lang: "es"
translationOf: "lambda-api-gateway-vs-web-functions"
tags: ["aws", "lambda", "cdk", "serverless"]
---

Durante años, exponer una función Lambda por HTTP significó poner **API Gateway** por delante. Lambda ahora ofrece otra opción: las **Web Functions**, donde la función misma es un servidor HTTP común y obtiene su propio endpoint HTTPS.

Para compararlas con honestidad armé la misma API dos veces, con las mismas tres rutas, y desplegué cada una con AWS CDK en TypeScript.

> Esta es una comparación estructural de lo que se escribe y lo que se despliega. No medí latencia, cold starts ni costos, así que no afirmo nada sobre ellos.

## El contrato compartido

Ambas implementaciones exponen:

| Ruta | Respuesta |
| --- | --- |
| `GET /health` | `{ "status": "ok", "pattern": "..." }` |
| `GET /hello?name=Ada` | `{ "message": "Hello, Ada!", ... }` |
| `GET /` | Método, ruta y request id |
| cualquier otra | `404` |

El campo `pattern` de cada respuesta indica qué stack respondió.

## Patrón 1: API Gateway + Lambda (legacy)

El handler recibe un **evento** y devuelve un objeto de respuesta. API Gateway se encarga de todo lo HTTP y lo traduce a ese evento.

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

La infraestructura es una función, una HTTP API, dos rutas comodín y un stage:

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

El enrutamiento, el throttling y la URL pública viven en API Gateway.

## Patrón 2: Lambda Web Function

No hay evento ni export `handler`. El código es un servidor HTTP de Node.js corriente que escucha en la dirección que Lambda le asigna:

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

Ahora el handler es simplemente `node:http` estándar. Se puede correr en local con `node index.js` y probarlo con `curl`, una gran ventaja para desarrollar.

En la infraestructura el modelo es distinto. En lugar de un solo recurso de función, hay tres:

1. **`WebFunction`**: la función con nombre.
2. **`WebFunctionRevision`**: una revisión inmutable con el código (desde S3), el runtime (`nodejs24.x`), el timeout, la concurrencia por entorno y el logging.
3. **`WebFunctionEndpoint`**: el endpoint HTTPS público, con pesos entre revisiones y sus propios límites de throttling y escalado.

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

Lo interesante es `revisionWeights`: mover tráfico entre revisiones es un concepto de primera clase del endpoint, no algo que se agrega con aliases.

## Lado a lado

| | API Gateway + Lambda | Lambda Web Function |
| --- | --- | --- |
| Forma del handler | `exports.handler(event)` | Servidor HTTP común |
| Modelo de request | Evento de API Gateway | `req` / `res` estándar |
| Puerta de entrada HTTP | API Gateway HTTP API | Endpoint integrado |
| Servicios a desplegar | Lambda + API Gateway | Solo Lambda |
| Unidad de despliegue | Versión de la función | Revisión inmutable |
| Traffic shifting | Aliases | `revisionWeights` en el endpoint |
| Throttling | Configuración del stage | `throttleConfig` del endpoint |
| Autenticación | Authorizers de API Gateway | `ApplicationManaged`: lo decide tu código |
| Desarrollo local | Requiere un evento o un emulador | `node index.js` |
| Soporte en CDK | Constructs L2 | Solo constructs L1 (`Cfn*`) |

## Problemas que encontré

- **Solo L1.** Todavía no hay constructs de alto nivel de CDK para Web Functions, así que hay que conectar a mano los tres recursos y sus dependencias.
- **El código vive en S3.** La revisión lee su código desde un bucket, por lo que el stack necesita un bucket versionado, una bucket policy que permita leerlo al servicio Lambda y una dependencia explícita para que la revisión no se cree antes que esa policy.
- **Tipos de recurso desconocidos.** El validador de CloudFormation de CDK imprime warnings `Unknown resource type 'AWS::Lambda::WebFunction'`. Son avisos, no fallos, pero hay que esperar ese ruido.
- **La autenticación `ApplicationManaged`** significa que el endpoint no autentica a los clientes por ti. Si migras desde API Gateway, pierdes sus authorizers integrados y debes resolverlo en tu código.

## Testeando ambos

Como la Web Function es solo un servidor HTTP, pude testearla con un request real. El test levanta el servidor en un puerto aleatorio y lo llama con `fetch`. El handler legacy se testea invocando la función con un evento falso. Mismas aserciones, dos formas muy distintas:

```ts
test('GET /health returns ok', async () => {
  const res = await fetch(`${base}/health`);
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ status: 'ok', pattern: 'web-function' });
});
```

Los stacks en sí se cubren con las aserciones `Template` de CDK (cantidad de recursos, runtime, tipo de endpoint, bucket policy).

## Conclusiones

- Si ya usas API Gateway y dependes de sus authorizers, usage plans o validación de requests, no hay motivo para migrar solo por novedad.
- Si buscas un servidor HTTP simple, menos piezas y traffic shifting basado en revisiones, las Web Functions merecen una mirada seria.
- En cualquier caso, mantén la lógica de negocio fuera de la capa de transporte. Eso fue lo que hizo trivial portar las mismas tres rutas entre ambos patrones.
