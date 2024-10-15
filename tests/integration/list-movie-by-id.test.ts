import supertest from "supertest";
import mongoose from "mongoose";
import app from "../../src/interface";
import { MovieModel } from "../../src/infrastructure/database/mongo-db/model";

const request = supertest(app);

describe("ListMovieByIdE2E", () => {
  let createdMovie: any;

  // Conecta ao banco de dados antes dos testes
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI as string);
  });

  // Limpa o banco de dados antes de cada teste
  beforeEach(async () => {
    await mongoose.connection.dropDatabase();

    // Cria um filme para ser usado nos testes
    createdMovie = await MovieModel.create({
      title: "The Matrix",
      summary: "A sci-fi movie about virtual reality",
      origin: "USA",
      image: "matrix.jpg",
    });
  });

  // Fecha a conexão com o banco após os testes
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Cenário 1: Deve retornar o filme pelo ID
  it("should return the movie with the given id", async () => {
    const response = await request.get(`/movies/${createdMovie._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      _id: createdMovie._id.toString(),
      title: "The Matrix",
      summary: "A sci-fi movie about virtual reality",
      origin: "USA",
      image: "matrix.jpg",
    });
  });

  // Cenário 2: Deve retornar 404 se o filme não for encontrado
  it("should return 404 if movie is not found", async () => {
    const nonExistentId = new mongoose.Types.ObjectId(); // Gera um ID inexistente

    const response = await request.get(`/movies/${nonExistentId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Movie not found");
  });
});
