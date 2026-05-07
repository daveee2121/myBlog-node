'use server'

import { createPost, updatePost, deletePost } from '@/lib/api/posts'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// redirect() muss AUSSERHALB von try/catch stehen —
// Next.js wirft intern einen Fehler für redirect(), den try/catch sonst abfangen würde

export async function createPostAction(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  try {
    await createPost({ title, content })
    revalidatePath('/posts')
  } catch (error) {
    console.error('createPostAction:', error)
    throw new Error('Post konnte nicht erstellt werden.')
  }

  redirect('/posts')
}

export async function updatePostAction(id: string, formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  try {
    await updatePost(id, { title, content })
    revalidatePath('/posts')
    revalidatePath(`/posts/${id}`)
  } catch (error) {
    console.error('updatePostAction:', error)
    throw new Error('Post konnte nicht gespeichert werden.')
  }

  redirect('/posts')
}

export async function deletePostAction(id: string) {
  try {
    await deletePost(id)
    revalidatePath('/posts')
  } catch (error) {
    console.error('deletePostAction:', error)
    throw new Error('Post konnte nicht gelöscht werden.')
  }

  redirect('/posts')
}
