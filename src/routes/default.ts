import express from 'express'

const router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => {
  const foo = (subject: string): string => {
    return `Hello ${subject}!`
  }

  res.status(200).json(foo('World!'))
})

export default router
