import express from 'express'
import cors from 'cors'
import postRoutes from './routes/post.routes'
import { errorHandler } from './middlewares/errorHandler'

const app = express()

// Middlewares
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())

// Routes
app.use('/api/posts', postRoutes)

// Error-Handling (muss immer am Ende stehen)
app.use(errorHandler)

export default app
