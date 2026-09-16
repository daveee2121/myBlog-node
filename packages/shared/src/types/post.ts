import type { z } from 'zod'
import type { createPostSchema, postSchema, updatePostSchema } from '../schemas/post.schema'

// API-Vertrag: So sieht ein Post in der JSON-Antwort der API aus.
// Nicht zu verwechseln mit dem Prisma-Typ im Backend (dort ist createdAt ein Date,
// über JSON wird daraus ein String).
export type PostDto = z.infer<typeof postSchema>

// Request-Typen werden aus den Schemas abgeleitet, damit Typ und Validierung nie auseinanderlaufen.
export type CreatePostDto = z.infer<typeof createPostSchema>
export type UpdatePostDto = z.infer<typeof updatePostSchema>
