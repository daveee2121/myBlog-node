# @myblog/api

Express API fuer das myBlog-Monorepo.

```bash
npm run dev --workspace @myblog/api
```

Die API mountet Posts unter:

```txt
http://localhost:4000/api/posts
```

Prisma liest die Datenbankverbindung aus `DATABASE_URL`.

Gemeinsame DTOs und Daten-Typen kommen aus `@myblog/shared`.
