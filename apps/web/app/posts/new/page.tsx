import { createPostAction } from '@/features/posts/actions/post.actions'
import { PostForm } from '@/features/posts/components/PostForm'

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <h1 className="text-2xl font-bold tracking-tight">Neuer Post</h1>
      <PostForm action={createPostAction} submitLabel="Erstellen" cancelHref="/posts" />
    </div>
  )
}
