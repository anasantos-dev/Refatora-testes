import { Schema, model, Document } from 'mongoose';

// Interface para tipar o documento do Mongoose
interface MovieDocument extends Document {
  title: string;
  summary: string;
  origin: string;
  image: string;
  createdAt: Date;
}

// Definindo o esquema com tipos corretos
const ModelSchema = new Schema<MovieDocument>({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Criando o modelo
export const MovieModel = model<MovieDocument>('Movie', ModelSchema);
export const UserModel = model('users', ModelSchema)