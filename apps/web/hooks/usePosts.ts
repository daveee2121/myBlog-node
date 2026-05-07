import { useEffect, useState } from 'react'
import type { Post } from '@myblog/shared'
import { getAllPosts } from '@/lib/api/posts'

// Nützlich für Client Components die Posts reaktiv laden brauchen
// (z.B. mit Suche, Filter, Live-Reload nach User-Aktion)
export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAllPosts()
      .then(setPosts)
      .catch(() => setError('Fehler beim Laden'))
      .finally(() => setLoading(false))
  }, [])

  return { posts, loading, error }
}
