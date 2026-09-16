import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './config/env'
import postRoutes from './modules/posts/post.routes'
import { errorHandler } from './middlewares/errorHandler'

const app = express()

// Middlewares
app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ origin: env.WEB_ORIGIN }))
app.use(express.json({ limit: '1mb' }))

// Routes
app.use('/api/posts', postRoutes)

// Error-Handling (muss immer am Ende stehen)
app.use(errorHandler)

export default app
