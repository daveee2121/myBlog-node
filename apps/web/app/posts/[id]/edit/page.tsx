import { notFound } from 'next/navigation'
import { getPostById } from '@/features/posts/api-client/posts'
import { updatePostAction } from '@/features/posts/actions/post.actions'
import { PostForm } from '@/features/posts/components/PostForm'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPostById(id)

  if (!post) notFound()

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <h1 className="text-2xl font-bold tracking-tight">Post bearbeiten</h1>
      <PostForm
        action={updatePostAction.bind(null, id)}
        defaultValues={{ title: post.title, content: post.content }}
        submitLabel="Speichern"
        cancelHref="/posts"
      />
    </div>
  )
}
