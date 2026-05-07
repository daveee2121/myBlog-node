# myBlog

Professionelles Monorepo mit getrenntem Next.js-Frontend und Node.js/Express-Backend.

## Struktur

```txt
myBlog/
  apps/
    web/      # Next.js App Router Frontend
    api/      # Express API mit Prisma
  packages/
    shared/   # Gemeinsame Types, Schemas und Utilities
```

## Entwicklung

```bash
npm run dev
```

Einzelne Apps:

```bash
npm run dev:web
npm run dev:api
```

## Shared Package

Gemeinsame Typen liegen in `packages/shared` und werden von Web und API ueber `@myblog/shared` importiert.

Beispiel:

```ts
import type { Post } from '@myblog/shared'
```

## Checks

```bash
npm run typecheck
npm run build
```

## Umgebungsvariablen

Kopiere die Beispiel-Dateien und fuelle echte Werte ein:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```
