'use client'

import { useEffect, useState } from 'react'
import type { PostDto } from '@myblog/shared'
import { getAllPosts } from '../api-client/posts'

// Client-Hook: nur in Client Components ('use client') verwendbar.
// Aktuell ungenutzt, weil die Seiten Server Components sind und die Daten direkt laden.
// Als Muster behalten für Fälle mit reaktivem Laden (Suche, Filter, Neuladen nach User-Aktion).
export function usePosts() {
  const [posts, setPosts] = useState<PostDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    getAllPosts()
      .then((result) => {
        if (active) setPosts(result)
      })
      .catch(() => {
        if (active) setError('Fehler beim Laden')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { posts, loading, error }
}
