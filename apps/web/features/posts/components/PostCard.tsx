import Link from 'next/link'
import type { PostDto } from '@myblog/shared'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function PostCard({ post }: { post: PostDto }) {
  return (
    <Link href={`/posts/${post.id}`}>
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
  )
}
