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
    type: Schema.Types.ObjectId,
    ref: 'Character',
  },
  founded: {
    type: String,
  },
})

const House = mongoose.model('House', houseSchema)

export default House
