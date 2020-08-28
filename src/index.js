import express from 'express'
import cors from 'cors'
import defaultRouter from './routes/default'

const app = express()

app.use(cors())
app.use(defaultRouter)

app.listen(8000)

export default app
