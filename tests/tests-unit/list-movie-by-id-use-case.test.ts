import { ListMovieByIdUseCase } from "../../src/application/use-cases/list-movie-by-id-use-case";
import { MovieRepository } from "../../src/application/repositories/movie-repository";
import { Movie } from "../../src/domain/movie";

describe("ListMovieByIdUseCase", () => {
  let movieRepository: MovieRepository;
  let listMovieByIdUseCase: ListMovieByIdUseCase;

  beforeEach(() => {
    movieRepository = {
      findById: jest.fn(),
    } as any;

    listMovieByIdUseCase = new ListMovieByIdUseCase(movieRepository);
  });

  it("should return a movie when the movie is found", async () => {
    const mockMovie: Movie = {
      id: "1",
      title: "Example Movie",
      summary: "Example summary",
      origin: "USA",
      image: "url",
      createdAt: new Date(),
    };
    (movieRepository.findById as jest.Mock).mockResolvedValue(mockMovie); // Mocka o retorno do repositório

    const movie = await listMovieByIdUseCase.execute("1");

    expect(movie).toEqual(mockMovie); // Verifica se o filme retornado é o esperado
  });

  it("should throw an error if the movie is not found", async () => {
    (movieRepository.findById as jest.Mock).mockResolvedValue(null); // Simula que o filme não foi encontrado

    await expect(listMovieByIdUseCase.execute("1")).rejects.toThrow(
      "Movie not found"
    ); // Verifica se o erro é lançado
  });
});
