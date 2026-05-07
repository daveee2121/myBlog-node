import { Request, Response, NextFunction } from 'express'

// Globale Error-Middleware — fängt alle Fehler die mit next(err) weitergeleitet werden
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(`[Error] ${err.message}`)
  res.status(500).json({ error: err.message || 'Interner Serverfehler' })
}
