# @myblog/web

Next.js Frontend fuer das myBlog-Monorepo.

```bash
npm run dev:web
```

Die App erwartet die API unter `NEXT_PUBLIC_API_URL`, standardmaessig:

```txt
http://localhost:4000/api
```

Gemeinsame Typen und zod-Schemas kommen aus `@myblog/shared`.
API-Antworten werden an der Frontend-Grenze ebenfalls mit diesen Schemas geprüft.

Fachbereiche liegen unter `features/<name>/`, `app/` enthält nur Routing.
