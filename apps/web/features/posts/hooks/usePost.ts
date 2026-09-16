'use client'

import { useEffect, useState } from 'react'
import type { PostDto } from '@myblog/shared'
import { getPostById } from '../api-client/posts'

// Client-Hook: nur in Client Components ('use client') verwendbar.
// Aktuell ungenutzt, als Muster für reaktives Laden eines einzelnen Posts behalten.
export function usePost(id: string) {
  const [result, setResult] = useState<{
    id: string | null
    post: PostDto | null
    error: string | null
  }>({ id: null, post: null, error: null })

  useEffect(() => {
    let active = true

    getPostById(id)
      .then((post) => {
        if (active) setResult({ id, post, error: null })
      })
      .catch(() => {
        if (active) setResult({ id, post: null, error: 'Fehler beim Laden' })
      })

    return () => {
      active = false
    }
  }, [id])

  if (result.id !== id) {
    return { post: null, loading: true, error: null }
  }

  return { post: result.post, loading: false, error: result.error }
}
