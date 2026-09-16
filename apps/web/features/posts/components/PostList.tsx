import type { PostDto } from '@myblog/shared'
import { PostCard } from './PostCard'

export function PostList({ posts }: { posts: PostDto[] }) {
  if (posts.length === 0) {
    return <p className="text-muted-foreground">Noch keine Posts vorhanden.</p>
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
