import{ Schema, model } from 'mongoose'

const ModelSchema = new Schema({
  
    title: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    origin: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    }
  })
  
  export const MovieModel = model('Movie', ModelSchema);
