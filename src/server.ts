import cors from 'cors'
import express from 'express'
import { router } from './router'
import { errorHandlerMiddleware } from './middlewares/error-handler'

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", router)// Suas rotas aqui...
app.use(errorHandlerMiddleware)// Middleware de erro (deve ser o último!)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})