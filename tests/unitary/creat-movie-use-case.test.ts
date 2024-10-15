import { CreateMoviesUseCase } from "../../src/application/use-cases/create-movies-use-case";
import { MovieRepository } from "../../src/application/repositories/movie-repository";
import { Movie } from "../../src/domain/movie";

// Mock do repositório de filmes
const movieRepositoryMock: MovieRepository = {
  save: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe("CreateMovieUseCase", () => {
  let createMovieUseCase: CreateMoviesUseCase;

  beforeEach(() => {
    createMovieUseCase = new CreateMoviesUseCase(movieRepositoryMock);
  });

  it("should create a movie and save it", async () => {
    const movieParams: Movie = {
      title: "The Pragmatic Programmer",
      summary: "Andrew Hunt",
      origin: "Addison-Wesley",
      image: "Programming",
      createdAt: new Date(),
    };

    // Mock da função save para retornar o filme criado
    (movieRepositoryMock.save as jest.Mock).mockResolvedValue(movieParams);

    const result = await createMovieUseCase.execute(movieParams);

    // Verifique se o resultado contém os valores esperados
    expect(result).toMatchObject({
      ...movieParams,
      createdAt: expect.any(Date),
    });

    // Verifique se o método save foi chamado corretamente
    expect(movieRepositoryMock.save).toHaveBeenCalledWith(expect.objectContaining(movieParams));
  });

  it("should throw an error if required parameters are missing", async () => {
    const movieParams = {
      title: "", // Título vazio
      summary: "Andrew Hunt",
      origin: "Addison-Wesley",
      image: "Programming",
    };

    // Verificar se o caso de uso lança um erro quando os parâmetros obrigatórios estão ausentes
    await expect(createMovieUseCase.execute(movieParams as Movie)).rejects.toThrow(
      'Todos os campos (title, summary, origin, image) são obrigatórios.',
    );
  });
});
