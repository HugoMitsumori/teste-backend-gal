import mongoose from 'mongoose'

const Schema = mongoose.Schema

const houseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  currentLord: {
    type: String,
  },
  founded: {
    tyope: String,
  },
})

const House = mongoose.model('House', houseSchema)

export default House
