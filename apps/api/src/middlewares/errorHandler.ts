import type { Request, Response, NextFunction } from 'express'

function isPrismaNotFoundError(error: unknown): error is { code: 'P2025' } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'P2025'
  )
}

function isMalformedJsonError(error: unknown): error is { status: 400; type: 'entity.parse.failed' } {
  return (
    error instanceof SyntaxError &&
    'status' in error &&
    error.status === 400 &&
    'type' in error &&
    error.type === 'entity.parse.failed'
  )
}

// Globale Error-Middleware — fängt alle Fehler die mit next(err) weitergeleitet werden
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (isMalformedJsonError(err)) {
    return res.status(400).json({ error: 'Ungültiges JSON' })
  }

  // Prisma meldet update/delete eines nicht vorhandenen Datensatzes mit P2025.
  if (isPrismaNotFoundError(err)) {
    return res.status(404).json({ error: 'Post nicht gefunden' })
  }

  console.error('[Error]', err)
  return res.status(500).json({ error: 'Interner Serverfehler' })
}
