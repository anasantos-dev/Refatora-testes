import supertest from "supertest";
import mongoose from "mongoose";
import app from "../../src/interface"; // Certifique-se que o caminho esteja correto

const request = supertest(app);

describe("DeleteMovieE2E", () => {
  // Conexão e desconexão com o MongoDB para cada teste
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI as string);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  // Cenário 1: Deve deletar um filme existente
  it("should delete an existing movie", async () => {
    // Primeiro, cria um filme para garantir que ele existe
    const movieData = {
      title: "The Matrix",
      summary: "A sci-fi movie about virtual reality",
      origin: "USA",
      image: "matrix.jpg",
    };

    // Cria o filme e armazena a resposta
    const createResponse = await request.post("/movies").send(movieData);
    const createdMovieId = createResponse.body._id || createResponse.body.id; // Considera _id ou id

    // Verifica se o filme foi criado corretamente
    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toMatchObject({
      ...movieData,
      _id: expect.any(String), // Garante que o _id foi gerado (ajustado para _id)
      createdAt: expect.any(String), // Garante que a data foi gerada
    });

    // Agora tenta deletar o filme que acabou de ser criado
    const deleteResponse = await request.delete(`/movies/${createdMovieId}`);

    // Verifica se o status é 200 (sucesso)
    expect(deleteResponse.status).toBe(200);

    // Verifica se a resposta contém a mensagem correta
    expect(deleteResponse.body.message).toBe(`Filme com id ${createdMovieId} deletado com sucesso.`);
  });

  // Cenário 2: Deve retornar 404 ao tentar deletar um filme que não existe
  it("should return 404 if the movie does not exist", async () => {
    const nonExistentMovieId = "5f8f8c44b54764421b7156c6"; // ID fictício

    const deleteResponse = await request.delete(`/movies/${nonExistentMovieId}`);

    // Verifica se o status é 404 (não encontrado)
    expect(deleteResponse.status).toBe(404);

    // Verifica se a mensagem de erro está correta
    expect(deleteResponse.body.message).toBe(`Filme com id ${nonExistentMovieId} não encontrado.`);
  });
});
