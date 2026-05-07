import Link from 'next/link'
import { getPostById } from '@/lib/api/posts'
import { updatePostAction } from '../../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { buttonVariants } from '@/components/ui/button-variants'

// Server Component — Post wird server-seitig geladen, kein Hook nötig
export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPostById(id)

  if (!post) return <p className="text-muted-foreground">Post nicht gefunden.</p>

  const updateWithId = updatePostAction.bind(null, id)

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <h1 className="text-2xl font-bold tracking-tight">Post bearbeiten</h1>
      <form action={updateWithId} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Titel</Label>
          <Input id="title" name="title" defaultValue={post.title} required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="content">Inhalt</Label>
          <Textarea
            id="content"
            name="content"
            defaultValue={post.content}
            className="min-h-40 resize-none"
            required
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit">Speichern</Button>
          <Link href="/posts" className={buttonVariants({ variant: 'outline' })}>
            Abbrechen
          </Link>
        </div>
      </form>
    </div>
  )
}
