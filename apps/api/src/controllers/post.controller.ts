import { Request, Response, NextFunction } from 'express'
import type { CreatePostDto, UpdatePostDto } from '@myblog/shared'
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from '../services/post.service'

type PostParams = {
  id: string
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const posts = await getAllPosts()
    res.json(posts)
  } catch (err) {
    next(err)  // → weiter an errorHandler Middleware
  }
}

export async function getOne(req: Request<PostParams>, res: Response, next: NextFunction) {
  try {
    const post = await getPostById(parseInt(req.params.id))
    if (!post) return res.status(404).json({ error: 'Post nicht gefunden' })
    res.json(post)
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, content }: CreatePostDto = req.body
    const post = await createPost(title, content)
    res.status(201).json(post)
  } catch (err) {
    next(err)
  }
}

export async function update(req: Request<PostParams>, res: Response, next: NextFunction) {
  try {
    const { title, content }: UpdatePostDto = req.body
    const post = await updatePost(parseInt(req.params.id), title, content)
    res.json(post)
  } catch (err) {
    next(err)
  }
}

export async function remove(req: Request<PostParams>, res: Response, next: NextFunction) {
  try {
    await deletePost(parseInt(req.params.id))
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
