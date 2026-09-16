'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createPostSchema, updatePostSchema } from '@myblog/shared'
import { ApiError } from '@/lib/api-client'
import { createPost, updatePost, deletePost } from '../api-client/posts'
import type { PostFormState } from '../types'

// Server Actions: laufen immer auf dem Server. Durch die modulweite 'use server'-Direktive
// dürfen sie bei Bedarf auch direkt aus einer Client Component importiert und ausgelöst werden.
//
// Frontend-Validierung = gute Benutzererfahrung (Fehler direkt am Formular).
// Das Backend validiert trotzdem noch einmal, weil die API auch direkt aufgerufen werden kann.
//
// redirect() muss AUSSERHALB von try/catch stehen,
// weil Next.js intern einen Fehler dafür wirft, den catch sonst abfangen würde.

function readForm(formData: FormData) {
  return {
    title: String(formData.get('title') ?? ''),
    content: String(formData.get('content') ?? ''),
  }
}

function backendErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ApiError && error.status === 400) return 'Die Eingabe wurde vom Server abgelehnt.'
  if (error instanceof ApiError && error.status === 404) return 'Post nicht gefunden.'
  return fallback
}

export async function createPostAction(
  _prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const values = readForm(formData)
  const result = createPostSchema.safeParse(values)

  if (!result.success) {
    return { fieldErrors: z.flattenError(result.error).fieldErrors, values }
  }

  try {
    await createPost(result.data)
  } catch (error) {
    console.error('createPostAction:', error)
    return { error: backendErrorMessage(error, 'Post konnte nicht erstellt werden.'), values }
  }

  revalidatePath('/posts')
  redirect('/posts')
}

export async function updatePostAction(
  id: string,
  _prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const values = readForm(formData)
  const result = updatePostSchema.safeParse(values)

  if (!result.success) {
    return { fieldErrors: z.flattenError(result.error).fieldErrors, values }
  }

  try {
    await updatePost(id, result.data)
  } catch (error) {
    console.error('updatePostAction:', error)
    return { error: backendErrorMessage(error, 'Post konnte nicht gespeichert werden.'), values }
  }

  revalidatePath('/posts')
  revalidatePath(`/posts/${id}`)
  redirect('/posts')
}

export async function deletePostAction(id: string) {
  try {
    await deletePost(id)
  } catch (error) {
    console.error('deletePostAction:', error)
    throw new Error('Post konnte nicht gelöscht werden.')
  }

  revalidatePath('/posts')
  redirect('/posts')
}
