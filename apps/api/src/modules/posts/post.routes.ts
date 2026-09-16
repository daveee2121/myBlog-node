import { Router } from 'express'
import { getAll, getOne, create, update, remove } from './post.controller'

// Routen: ordnen HTTP-Methode + Pfad einem Controller zu. Keine Logik hier.
const router = Router()

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', create)
router.put('/:id', update) // PUT = vollständiger Zustand (title + content)
router.delete('/:id', remove)

export default router
