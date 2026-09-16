import { z } from 'zod'

// Validierungsschemas sind die einzige Quelle der Wahrheit für Post-Daten.
// Das Backend prüft damit echte HTTP-Anfragen, das Frontend dieselben Regeln im Formular.
// Die TypeScript-Typen werden in ../types/post.ts daraus abgeleitet.

export const createPostSchema = z.object({
  title: z.string().trim().min(1, 'Titel darf nicht leer sein').max(200, 'Titel darf höchstens 200 Zeichen lang sein'),
  content: z.string().trim().min(1, 'Inhalt darf nicht leer sein'),
})

// PUT ersetzt den vollständigen bearbeitbaren Zustand, deshalb sind beide Felder Pflicht.
// Für Teilaktualisierungen später: createPostSchema.partial() zusammen mit einer PATCH-Route.
export const updatePostSchema = createPostSchema

// URL-Parameter kommen immer als String an ("42"), daher coerce zu einer Zahl.
export const postIdSchema = z.coerce.number().int().positive()

// Antwortvertrag der API. Anders als Prisma liefert JSON das Datum als String.
export const postSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  content: z.string(),
  createdAt: z.iso.datetime(),
})

export const postsSchema = z.array(postSchema)
