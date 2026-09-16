import app from './app'
import { env } from './config/env'
import { prisma } from './lib/prisma'

const server = app.listen(env.PORT, () => {
  console.log(`Server läuft auf Port ${env.PORT}`)
})

let isShuttingDown = false

function shutdown(signal: string) {
  if (isShuttingDown) return
  isShuttingDown = true

  console.log(`${signal} empfangen, Server wird beendet ...`)
  server.close(async (error) => {
    if (error) {
      console.error('Server konnte nicht sauber beendet werden:', error)
      process.exit(1)
    }

    await prisma.$disconnect()
    process.exit(0)
  })
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
