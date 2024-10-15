import { Schema, model, Document } from 'mongoose';


interface MovieDocument extends Document {// Interface para tipar o documento do Mongoose
  title: string;
  summary: string;
  origin: string;
  image: string;
  createdAt: Date;
}

const ModelSchema = new Schema<MovieDocument>({// Definindo o esquema com tipos corretos
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

const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});
// Criando o modelo
export const MovieModel = model<MovieDocument>('Movie', ModelSchema);
export const UserModel = model('users', UserSchema)