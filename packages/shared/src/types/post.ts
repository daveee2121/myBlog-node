export type Post = {
  id: number
  title: string
  content: string
  createdAt: string
}

export type CreatePostDto = {
  title: string
  content: string
}

export type UpdatePostDto = {
  title: string
  content: string
}
