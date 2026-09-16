import {
  postSchema,
  postsSchema,
  type CreatePostDto,
  type PostDto,
  type UpdatePostDto,
} from '@myblog/shared'
import { apiClient, ApiError } from '@/lib/api-client'

// API-Client: ruft die bestehende Express-API auf, stellt selbst keine API bereit.
// Wird von Server Components, Server Actions und Client-Hooks gleichermaßen genutzt.

export async function getAllPosts() {
  return postsSchema.parse(await apiClient<unknown>('/posts'))
}

// Gibt null zurück, wenn der Post nicht existiert, damit Seiten und Hooks das einfach behandeln können
export async function getPostById(id: string): Promise<PostDto | null> {
  try {
    return postSchema.parse(await apiClient<unknown>(`/posts/${id}`))
  } catch (error) {
    if (error instanceof ApiError && (error.status === 404 || error.status === 400)) return null
    throw error
  }
}

export async function createPost(data: CreatePostDto): Promise<PostDto> {
  const response = await apiClient<unknown>('/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return postSchema.parse(response)
}

export async function updatePost(id: string, data: UpdatePostDto): Promise<PostDto> {
  const response = await apiClient<unknown>(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
  return postSchema.parse(response)
}

export function deletePost(id: string) {
  return apiClient<void>(`/posts/${id}`, { method: 'DELETE' })
}
