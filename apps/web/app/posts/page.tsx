import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'
import { getAllPosts } from '@/features/posts/api-client/posts'
import { PostList } from '@/features/posts/components/PostList'

// Seite = nur Einstieg: Daten laden und an Feature-Komponenten übergeben.
// Server Component, deshalb kein Hook nötig.
export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
        <Link href="/posts/new" className={buttonVariants()}>Neuer Post</Link>
      </div>
      <PostList posts={posts} />
    </div>
  )
}
