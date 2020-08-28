import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  const foo = (subject) => {
    return `Hello ${subject}!`
  }

  res.status(200).json(foo('World!'))
})

export default router
