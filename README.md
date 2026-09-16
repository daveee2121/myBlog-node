# myBlog

Monorepo mit getrenntem Next.js-Frontend und Node.js/Express-Backend.
Dient als Lernprojekt und als Vorlage für die Struktur späterer Projekte.

## Struktur

```txt
myBlog-node/
├── apps/
│   ├── web/                          # Next.js App Router Frontend
│   │   ├── app/                      # NUR Routing: URLs, Layouts, Seiten, loading/error
│   │   │   └── posts/
│   │   ├── features/                 # Fachliche Bereiche
│   │   │   └── posts/
│   │   │       ├── actions/          # Server Actions ('use server')
│   │   │       ├── api-client/       # HTTP-Aufrufe zum Express-Backend
│   │   │       ├── components/       # Post-spezifische UI (PostList, PostForm, ...)
│   │   │       ├── hooks/            # Client-Hooks (usePosts, usePost)
│   │   │       └── types.ts          # NUR Frontend-Typen (z. B. Formularzustand)
│   │   ├── components/
│   │   │   ├── layout/               # Navbar, Footer, Sidebar
│   │   │   └── ui/                   # Allgemeine Bausteine (Button, Card, Input)
│   │   └── lib/
│   │       ├── api-client.ts         # Zentraler HTTP-Client (Base-URL, Fehler, 204)
│   │       └── utils.ts
│   │
│   └── api/                          # Express API mit Prisma
│       ├── prisma/
│       └── src/
│           ├── modules/
│           │   └── posts/
│           │       ├── post.routes.ts      # Methode + Pfad → Controller
│           │       ├── post.controller.ts  # HTTP + Validierung
│           │       └── post.service.ts     # Daten + Business-Logik (Prisma)
│           ├── middlewares/
│           ├── lib/
│           ├── app.ts
│           └── index.ts
│
└── packages/
    └── shared/                       # Verträge zwischen Frontend und Backend
        └── src/
            ├── schemas/              # zod-Schemas (Laufzeitvalidierung)
            ├── types/                # Aus Schemas abgeleitete Typen + PostDto
            └── index.ts
```

## Regeln

**Wohin gehört eine Datei?**
Braucht sie nur ein Feature, gehört sie ins Feature. Brauchen sie zwei oder mehr Features,
wandert sie eine Ebene höher (`components/`, `lib/`). Ordner erst anlegen, wenn sie gefüllt werden.

**Typen**

```txt
API-Verträge und Validierungsschemas  → packages/shared
Nur UI-Typen (Filter, Formularzustand) → apps/web/features/<feature>/types.ts
Datenbanktypen                        → von Prisma generiert, nur im Backend
```

`PostDto` beschreibt die JSON-Antwort der API (`createdAt: string`), nicht das Prisma-Objekt (`createdAt: Date`).

**Validierung**

```txt
Frontend-Validierung → gute Benutzererfahrung
Backend-Validierung  → Schutz von API und Datenbank (immer, auch wenn das Frontend prüft)
```

Beide nutzen dieselben zod-Schemas aus `@myblog/shared`. Typen werden mit `z.infer` abgeleitet.

**HTTP-Methoden**
`PUT` ersetzt den vollständigen Zustand, daher sind `title` und `content` Pflicht.
Für Teiländerungen später `PATCH` mit `createPostSchema.partial()` verwenden.

**Imports**
Kein Barrel-`index.ts` in Features, damit Server- und Client-Code nicht vermischt werden.
Direkt importieren, z. B. `@/features/posts/components/PostList`.
Server Actions mit `'use server'` kennzeichnen. `import 'server-only'` ist für reine
Server-Hilfsmodule gedacht, die niemals in den Client-Importgraph gelangen dürfen.

**Datenfluss (GET /posts)**

```txt
app/posts/page.tsx                      (Server Component)
  → getAllPosts()                       features/posts/api-client/posts.ts
  → apiClient('/posts')                 lib/api-client.ts
  → app.use('/api/posts', postRoutes)   apps/api/src/app.ts
  → router.get('/', getAll)             modules/posts/post.routes.ts
  → getAll()                            modules/posts/post.controller.ts
  → getAllPosts()                       modules/posts/post.service.ts
  → prisma.post.findMany()
  → PostgreSQL
```

## Entwicklung

```bash
npm install
npm run dev
```

Einzelne Apps:

```bash
npm run dev:web
npm run dev:api
```

## Checks

```bash
npm run typecheck
npm run lint
npm run test
npm run build
# oder alles zusammen:
npm run check
```

`npm run build` baut in dieser Reihenfolge das Shared-Package, die Express-API und das
Next.js-Frontend. Danach können die Apps getrennt mit `npm run start:api` und
`npm run start:web` gestartet werden.

## Umgebungsvariablen

Kopiere die Beispiel-Dateien und fülle echte Werte ein:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

Vor einem Deployment werden Datenbankmigrationen mit `npm run db:migrate:deploy`
ausgeführt. Die CI unter `.github/workflows/ci.yml` prüft Typen, Lint, Tests und alle Builds.
