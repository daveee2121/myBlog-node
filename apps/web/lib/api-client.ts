// Zentraler HTTP-Client für das Express-Backend.
// Base-URL, Header, Caching und Fehlerbehandlung stehen nur hier.
// Feature-Clients (z. B. features/posts/api-client/posts.ts) bauen darauf auf.

const API_URL = process.env.NEXT_PUBLIC_API_URL

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(`API-Fehler: ${status}`)
    this.name = 'ApiError'
  }
}

export async function apiClient<T>(path: string, options?: RequestInit): Promise<T> {
  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL ist nicht gesetzt (siehe .env.example)')
  }

  const headers = new Headers(options?.headers)
  headers.set('Accept', 'application/json')

  // Content-Type nur setzen, wenn tatsächlich ein Body gesendet wird.
  // Bei FormData setzt der Browser die benötigte Boundary automatisch.
  if (options?.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${API_URL}${path}`, {
    cache: 'no-store',
    ...options,
    headers,
  })

  if (!response.ok) {
    // Fehlermeldung des Backends behalten, z. B. zod-Details bei 400
    const body = await response.json().catch(() => null)
    throw new ApiError(response.status, body)
  }

  // 204 No Content (z. B. DELETE) hat keinen Body, response.json() würde hier werfen
  if (response.status === 204) return undefined as T

  return response.json() as Promise<T>
}
