import supertest from "supertest";
import app from "../../src/interface";
import mongoose from "mongoose";

jest.setTimeout(60000); 


const request = supertest(app);

describe("ListAllMoviesE2E", () => {
  beforeEach(async () => {
    console.log("Iniciando limpeza do banco de dados...");
    const start = Date.now();
    await mongoose.connection.dropDatabase();
    const end = Date.now();
    console.log(`Banco de dados limpo em ${end - start}ms`);
  });

  afterEach(async () => {
    console.log("Fechando a conexão com o MongoDB...");
    await mongoose.connection.dropDatabase();    
    await mongoose.connection.close();
    console.log("Conexão fechada");
  });

// Define um timeout global para este arquivo de teste
jest.setTimeout(60000); 

// Cenário 1: Deve retornar uma lista vazia se não houver filmes cadastrados
it("should return an empty list if there are no movies registered", async () => {
  console.log("Iniciando teste: Deve retornar uma lista vazia");

  // Limpa a coleção de filmes
  console.log("Limpando banco de dados...");
  const startDBClean = Date.now();
  await mongoose.connection.dropDatabase();
  const endDBClean = Date.now();
  console.log(`Banco de dados limpo em ${endDBClean - startDBClean}ms`);

  // Faz a requisição para listar os filmes
  console.log("Fazendo requisição GET /movies...");
  const startRequest = Date.now();
  const response = await request.get("/movies");
  const endRequest = Date.now();
  console.log(`Requisição GET /movies feita em ${endRequest - startRequest}ms`);

  // Verifica se o status retornado é 200 e a lista de filmes é vazia
  expect(response.status).toBe(200);
  expect(response.body).toEqual([]);

  console.log("Teste concluído com sucesso");
});



  // Cenário 2: Deve retornar a lista de filmes registrados
  it("should return a list with all movies registered", async () => {
    console.log("Iniciando teste: Deve retornar uma lista de todos os filmes registrados");

    const mockMovies = [
      {
        title: "The Matrix",
        summary: "A sci-fi movie about virtual reality",
        origin: "USA",
        image: "matrix.jpg",
      },
      {
        title: "Inception",
        summary: "A thriller about dreams within dreams",
        origin: "USA",
        image: "inception.jpg",
      },
    ];

    // Cadastra os filmes de teste
    for (const movie of mockMovies) {
      console.log(`Inserindo filme: ${movie.title}`);
      await request.post("/movies").send(movie);
    }

    // Faz a requisição para listar os filmes
    const response = await request.get("/movies");
    console.log("Resposta recebida:", response.body);

    // Verifica se o status retornado é 200
    expect(response.status).toBe(200);
    // Verifica se os filmes retornados estão de acordo com os cadastrados, ignorando _id e createdAt
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "The Matrix",
          summary: "A sci-fi movie about virtual reality",
          origin: "USA",
          image: "matrix.jpg",
        }),
        expect.objectContaining({
          title: "Inception",
          summary: "A thriller about dreams within dreams",
          origin: "USA",
          image: "inception.jpg",
        }),
      ])
    );
  });
});
  // Cenário 3: Deve retornar uma lista vazia se não houver filmes cadastrados
  it("should return an empty list if there are no movies registered", async () => {// Limpa a coleção de filmes
    
    await mongoose.connection.dropDatabase();

    // Faz a requisição para listar todos os filmes
    const response = await request.get("/movies");

    // Verifica se o status é 200
    expect(response.status).toBe(200);

    // Verifica se a resposta é um array vazio
    expect(response.body).toEqual([]);
  });

