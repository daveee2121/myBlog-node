import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { createPostSchema, updatePostSchema, postIdSchema } from '@myblog/shared'
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from './post.service'

// Controller: kümmert sich nur um HTTP.
// Request prüfen (Validierung), Service aufrufen, Response zurückschicken.
// req.body und req.params sind zur Laufzeit NICHT typsicher, deshalb validiert zod sie hier.

type PostParams = {
  id: string
}

function invalidInput(res: Response, error: z.ZodError) {
  return res.status(400).json({
    error: 'Ungültige Eingabe',
    details: z.flattenError(error),
  })
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const posts = await getAllPosts()
    res.json(posts)
  } catch (err) {
    next(err) // weiter an die errorHandler-Middleware
  }
}

export async function getOne(req: Request<PostParams>, res: Response, next: NextFunction) {
  try {
    const id = postIdSchema.safeParse(req.params.id)
    if (!id.success) return invalidInput(res, id.error)

    const post = await getPostById(id.data)
    if (!post) return res.status(404).json({ error: 'Post nicht gefunden' })

    res.json(post)
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const body = createPostSchema.safeParse(req.body)
    if (!body.success) return invalidInput(res, body.error)

    const post = await createPost(body.data)
    res.status(201).json(post)
  } catch (err) {
    next(err)
  }
}

export async function update(req: Request<PostParams>, res: Response, next: NextFunction) {
  try {
    const id = postIdSchema.safeParse(req.params.id)
    if (!id.success) return invalidInput(res, id.error)

    const body = updatePostSchema.safeParse(req.body)
    if (!body.success) return invalidInput(res, body.error)

    const post = await updatePost(id.data, body.data)
    res.json(post)
  } catch (err) {
    next(err)
  }
}

export async function remove(req: Request<PostParams>, res: Response, next: NextFunction) {
  try {
    const id = postIdSchema.safeParse(req.params.id)
    if (!id.success) return invalidInput(res, id.error)

    await deletePost(id.data)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
