import 'dotenv/config'
import app from './app'

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`)
})

// app.ts    →  definiert was der Server tut (handle_client)
