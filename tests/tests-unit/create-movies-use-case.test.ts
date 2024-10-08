import { CreateMoviesUseCase } from "../../src/application/use-cases/create-movies-use-case";
import { MovieRepository } from "../../src/application/repositories/movie-repository";
//import { Movie } from "../../src/domain/movie";

describe("CreateMoviesUseCase", () => {
  let movieRepository: MovieRepository;
  let createMoviesUseCase: CreateMoviesUseCase;

  beforeEach(() => {
    // Mock do repositório
    movieRepository = {
      save: jest.fn(),
    } as any; // Fazemos um cast para MovieRepository

    createMoviesUseCase = new CreateMoviesUseCase(movieRepository);
  });

  // Cenário 1: Verifica se o filme é criado corretamente
  it("should create a movie with valid parameters", async () => {
    const movieParams = {
      title: "Example Movie",
      summary: "Example summary",
      origin: "USA",
      image: "image-url",
    };

    // Mock da função save
    (movieRepository.save as jest.Mock).mockResolvedValue(null);

    // Executa o use case
    const movie = await createMoviesUseCase.execute(movieParams);

    // Verifica se o filme foi salvo corretamente
    expect(movieRepository.save).toHaveBeenCalledWith(movie);

    // Verifica se o filme retornado contém os parâmetros corretos
    expect(movie).toMatchObject({
      ...movieParams,
      createdAt: expect.any(Date), // Verifica se createdAt é uma data válida
    });
  });

  // Cenário 2: Verifica se ocorre um erro caso o repositório falhe ao salvar o filme
  it("should throw an error if the repository fails to save the movie", async () => {
    const movieParams = {
      title: "Example Movie",
      summary: "Example summary",
      origin: "USA",
      image: "image-url",
    };

    // Simula erro ao salvar o filme no repositório
    (movieRepository.save as jest.Mock).mockRejectedValue(
      new Error("Failed to save movie")
    );

    // Verifica se o erro é lançado corretamente
    await expect(createMoviesUseCase.execute(movieParams)).rejects.toThrow(
      "Failed to save movie"
    );
  });
});
