import type { CreatePostDto, UpdatePostDto } from '@myblog/shared'
import { prisma } from '../../lib/prisma'

// Service: alles, was mit Daten zu tun hat (Prisma, Business-Logik).
// Kennt kein HTTP, kein req/res. Arbeitet mit bereits validierten Daten.
// Rückgabetyp ist der von Prisma generierte Post-Typ (createdAt: Date).

export async function getAllPosts() {
  return prisma.post.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function getPostById(id: number) {
  return prisma.post.findUnique({ where: { id } })
}

export async function createPost(data: CreatePostDto) {
  return prisma.post.create({ data })
}

export async function updatePost(id: number, data: UpdatePostDto) {
  return prisma.post.update({ where: { id }, data })
}

export async function deletePost(id: number) {
  return prisma.post.delete({ where: { id } })
}
