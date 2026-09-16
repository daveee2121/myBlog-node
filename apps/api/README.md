# @myblog/api

Express API fuer das myBlog-Monorepo.

```bash
npm run dev:api
npm run build
npm run start:api
```

Die API mountet Posts unter:

```txt
http://localhost:4000/api/posts
```

Die API validiert beim Start `DATABASE_URL`, `PORT`, `WEB_ORIGIN` und `NODE_ENV`.
Die Beispielwerte stehen in `.env.example`.

Gemeinsame DTOs, Typen und zod-Schemas kommen aus `@myblog/shared`.

Fachbereiche liegen unter `src/modules/<name>/` (Routes, Controller, Service).

Für Deployments:

```bash
npm run db:migrate:deploy --workspace @myblog/api
```
