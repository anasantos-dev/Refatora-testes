import dotenv from 'dotenv'//conectar com a string q possue senha e usuario do cluster do mongodb
dotenv.config();
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Tentando conectar ao MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB conectado com sucesso");
  } catch (error) {
    console.log("Erro ao conectar no MongoDB", error);
  }
};
export const disconnectDB = async () => {
  try {    
    await mongoose.connection.close();
    console.log("Conexão com o MongoDB fechada com sucesso");
      } catch (error) {
    console.error("Erro ao desconectar do MongoDB", error);
  }
};
