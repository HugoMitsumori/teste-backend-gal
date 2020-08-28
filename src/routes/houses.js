import express from 'express'
import House from '../models/house.js'
import connectToDatabase from '../database-connection.js'

const router = express.Router()

router.get('/', async (req, res) => {
  await connectToDatabase()
  const houses = await House.find().exec()

  res.status(200).json(houses)
})

router.post('/', async (req, res) => {
  await connectToDatabase()
  const house = await House.create(req.body)

  res.status(201).json(house)
})

router.delete('/:id', async (req, res) => {
  await connectToDatabase()
  const house = await House.findOne({ _id: req.params.id })

  if (house) {
    await House.deleteOne({ _id: req.params.id })
    res.status(200).json()
  } else {
    res.status(404).json({ error: 'House not found!' })
  }
})

export default router
