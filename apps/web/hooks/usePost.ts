import { useEffect, useState } from 'react'
import type { Post } from '@myblog/shared'
import { getPostById } from '@/lib/api/posts'

// Nützlich für Client Components die einen einzelnen Post reaktiv laden brauchen
export function usePost(id: string) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getPostById(id)
      .then(setPost)
      .catch(() => setError('Fehler beim Laden'))
      .finally(() => setLoading(false))
  }, [id])

  return { post, loading, error }
}
