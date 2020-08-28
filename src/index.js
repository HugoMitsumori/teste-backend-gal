import express from 'express'
import cors from 'cors'
import defaultRouter from './routes/default.js'
import housesRouter from './routes/houses.js'

const app = express()
const router = express.Router()

app.use(cors())
app.use(express.json())

router.use('/', defaultRouter)
router.use('/houses', housesRouter)

app.use('/', router)
app.listen(8000)

export default app
