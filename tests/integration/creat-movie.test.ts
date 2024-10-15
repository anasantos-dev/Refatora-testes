import supertest from "supertest";
import app from "../../src/interface";
import mongoose from "mongoose";

const request = supertest(app);

describe("CreateMovieE2E", () => {
  const movieData = {
    title: "The Matrix",
    summary: "A sci-fi movie about virtual reality",
    origin: "USA",
    image: "matrix.jpg",
  };

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI as string);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should create a movie", async () => {
    const response = await request.post("/movies").send(movieData);

    // Verifica se o status é 201 (Created)
    expect(response.status).toBe(201);

    // Verifica se o body da resposta contém os dados corretos, incluindo _id
    expect(response.body).toMatchObject({
      ...movieData, // Verifica se os dados enviados estão corretos
      createdAt: expect.any(String), // Garante que a data de criação foi gerada
      _id: expect.any(String), // Garante que o ID foi gerado como _id
    });
  });

  it("should throw an error when creating a movie with invalid data", async () => {
    // Envia dados inválidos, sem os campos obrigatórios
    const response = await request.post("/movies").send({
      title: "Incomplete Movie",
    });

    // Verifica se o status retornado é 400 (Bad Request)
    expect(response.status).toBe(400);

    // Verifica se a mensagem de erro está presente
    expect(response.body).toHaveProperty("message", "Todos os campos são obrigatórios.");
  });
});
