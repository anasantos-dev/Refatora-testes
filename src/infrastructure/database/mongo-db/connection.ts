import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ana:ana@cluster0.gtzkx.mongodb.net/movies?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("MongoDB conectado com sucesso");
  } catch (error) {
    console.log("Erro ao conectar no MongoDB", error);
  }
};
