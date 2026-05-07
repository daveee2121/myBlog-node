import Link from 'next/link'
import { getAllPosts } from '@/lib/api/posts'
import { buttonVariants } from '@/components/ui/button-variants'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

// Server Component — kein 'use client', kein Hook, Daten direkt vom Server geladen
export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
        <Link href="/posts/new" className={buttonVariants()}>Neuer Post</Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">Noch keine Posts vorhanden.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map(post => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm line-clamp-2">{post.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(post.createdAt).toLocaleDateString('de-DE')}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
