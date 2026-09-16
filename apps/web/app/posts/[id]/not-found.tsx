import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'

// Wird angezeigt, wenn eine Seite unter /posts/[id] notFound() aufruft
export default function PostNotFound() {
  return (
    <div className="flex flex-col items-start gap-4">
      <p className="text-muted-foreground">Post nicht gefunden.</p>
      <Link href="/posts" className={buttonVariants({ variant: 'outline' })}>Zurück zur Übersicht</Link>
    </div>
  )
}
