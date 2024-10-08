import mongoose from "mongoose";

export const connectDB = async () => {
  // Verifica se o ambiente é de teste e usa a URI de teste, caso contrário, usa a URI padrão ou uma URI local de fallback
  const mongoURI = process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI ?? "mongodb+srv://ana:ana@cluster0.gtzkx.mongodb.net/movies?retryWrites=true&w=majority&appName=Cluster0";

  if (!mongoURI) {
    throw new Error('MongoDB URI is not defined');
  }

  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB conectado com sucesso");
  } catch (error) {
    console.error("Erro ao conectar no MongoDB", error);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB desconectado com sucesso");
  } catch (error) {
    console.error("Erro ao desconectar do MongoDB", error);
  }
};
