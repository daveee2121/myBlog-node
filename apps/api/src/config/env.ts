import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().max(65_535).default(4000),
  WEB_ORIGIN: z.url().default('http://localhost:3000'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL darf nicht leer sein'),
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
  console.error('Ungültige Umgebungsvariablen:', z.flattenError(result.error).fieldErrors)
  throw new Error('Die Server-Konfiguration ist ungültig. Prüfe apps/api/.env.')
}

export const env = result.data
