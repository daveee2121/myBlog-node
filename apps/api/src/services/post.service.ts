import { prisma } from '../lib/prisma'

export async function getAllPosts() {
  return prisma.post.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function getPostById(id: number) {
  return prisma.post.findUnique({ where: { id } })
}

export async function createPost(title: string, content: string) {
  return prisma.post.create({ data: { title, content } })
}

export async function updatePost(id: number, title: string, content: string) {
  return prisma.post.update({ where: { id }, data: { title, content } })
}

export async function deletePost(id: number) {
  return prisma.post.delete({ where: { id } })
}
