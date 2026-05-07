import Link from 'next/link'
import { getPostById } from '@/lib/api/posts'
import { deletePostAction } from '../actions'
import { buttonVariants } from '@/components/ui/button-variants'

// Server Component — params ist in Next.js 15+ ein Promise
export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPostById(id)

  if (!post) return <p className="text-muted-foreground">Post nicht gefunden.</p>

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-muted-foreground mb-1">
          {new Date(post.createdAt).toLocaleDateString('de-DE')}
        </p>
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
      </div>

      <p className="text-base leading-relaxed">{post.content}</p>

      <div className="flex items-center gap-2 pt-4 border-t">
        <Link href="/posts" className={buttonVariants({ variant: 'outline' })}>Zurück</Link>
        <Link href={`/posts/${id}/edit`} className={buttonVariants({ variant: 'outline' })}>Bearbeiten</Link>

        {/* Delete via Server Action — kein onClick, kein 'use client' nötig */}
        <form action={deletePostAction.bind(null, id)}>
          <button type="submit" className={buttonVariants({ variant: 'destructive' })}>
            Löschen
          </button>
        </form>
      </div>
    </div>
  )
}
