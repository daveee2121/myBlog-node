'use client'

import { Button } from '@/components/ui/button'

// Wird automatisch angezeigt, wenn eine Seite unter /posts einen Fehler wirft
// (z. B. Backend nicht erreichbar). Error-Boundaries müssen Client Components sein.
export default function PostsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.error(error)

  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Etwas ist schiefgelaufen</h1>
      <p className="text-muted-foreground">
        Die Posts konnten nicht geladen werden. Läuft das Backend?
      </p>
      <Button onClick={reset}>Erneut versuchen</Button>
    </div>
  )
}
