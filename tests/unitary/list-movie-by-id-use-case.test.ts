import { ListMovieByIdUseCase } from "../../src/application/use-cases/list-movie-by-id-use-case";
import { MovieRepository } from "../../src/application/repositories/movie-repository";
import { Movie } from "../../src/domain/movie";

describe('ListMovieByIdUseCase', () => {
  let listMovieByIdUseCase: ListMovieByIdUseCase;
  let movieRepositoryMock: jest.Mocked<MovieRepository>;

  const movieExample: Movie = {
    id: '1',
    title: 'The Matrix',
    summary: 'A sci-fi movie about virtual reality',
    origin: 'USA',
    image: 'matrix.jpg',
    createdAt: new Date(),
  };

  beforeEach(() => {
    movieRepositoryMock = {
      findById: jest.fn(),
      delete: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    };
    listMovieByIdUseCase = new ListMovieByIdUseCase(movieRepositoryMock);
  });

  // Cenário 1: Deve retornar um filme existente pelo ID
  it('should return an existing movie by ID', async () => {
    // Simula encontrar o filme
    movieRepositoryMock.findById.mockResolvedValueOnce(movieExample);

    const result = await listMovieByIdUseCase.execute('1');

    // Verifica se o método findById foi chamado com o ID correto
    expect(movieRepositoryMock.findById).toHaveBeenCalledWith('1');

    // Verifica se o filme retornado é o mesmo que foi encontrado
    expect(result).toEqual(movieExample);
  });

  // Cenário 2: Deve lançar um erro se o filme não for encontrado
  it('should throw an error if the movie is not found', async () => {
    // Simula que o filme não foi encontrado
    movieRepositoryMock.findById.mockResolvedValueOnce(null);

    // Verifica se o método lança um erro
    await expect(listMovieByIdUseCase.execute('2')).rejects.toThrow('Movie not found');

    // Verifica se o método findById foi chamado
    expect(movieRepositoryMock.findById).toHaveBeenCalledWith('2');
  });
});
