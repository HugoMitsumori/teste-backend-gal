import mongoose from 'mongoose'

const Schema = mongoose.Schema

const character = new Schema({
  name: {
    type: String,
    required: true,
  },
  tvSeries: [String],
})

const Character = mongoose.model('Character', character)

export default Character
