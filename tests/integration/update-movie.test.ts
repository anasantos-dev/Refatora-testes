import supertest from "supertest";
import mongoose from "mongoose";
import app from "../../src/interface"; 
import { MovieModel } from "../../src/infrastructure/database/mongo-db/model";

const request = supertest(app);

describe("UpdateMovieE2E", () => {
  let createdMovie: any;

  // Conectando ao banco de dados antes de todos os testes
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI as string);
  });

  // Limpa o banco de dados antes de cada teste
  beforeEach(async () => {
    await mongoose.connection.dropDatabase();

    // Cria um filme para ser atualizado
    createdMovie = await MovieModel.create({
      title: "Original Title",
      summary: "Original Summary",
      origin: "Original Origin",
      image: "original.jpg",
    });
  });

  // Fecha a conexão com o banco de dados após todos os testes
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Cenário 1: Deve atualizar um filme existente
  it("should update an existing movie", async () => {
    const updatedMovieData = {
      title: "Updated Title",
      summary: "Updated Summary",
      origin: "Updated Origin",
      image: "updated.jpg",
    };

    const response = await request
      .put(`/movies/${createdMovie._id}`) // Faz a requisição PUT com o ID do filme criado
      .send(updatedMovieData);

    // Atualizando o teste para refletir a resposta real da API
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: `Filme com id ${createdMovie._id} atualizado com sucesso.`,
      movieUpdated: {
        ...updatedMovieData,
        _id: createdMovie._id.toString(), // Verifica se o ID não mudou
        createdAt: expect.any(String), // Verifica que o campo createdAt existe
      },
    });
  });

  // Cenário 2: Deve retornar 404 se o filme não for encontrado
  it("should return 404 if movie is not found", async () => {
    const nonExistentId = new mongoose.Types.ObjectId(); // Gera um ID inexistente

    const response = await request.put(`/movies/${nonExistentId}`).send({
      title: "Updated Title",
      summary: "Updated Summary",
      origin: "Updated Origin",
      image: "updated.jpg",
    });

    // Ajustando o teste para a mensagem de erro correta em português
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      `Filme com id ${nonExistentId} não encontrado.`
    );
  });
});
