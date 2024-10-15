import { ListAllMoviesUseCase } from "../../src/application/use-cases/list-all-movies-use-case";
import { MovieRepository } from "../../src/application/repositories/movie-repository";
import { Movie } from "../../src/domain/movie";

describe('ListAllMoviesUseCase', () => {
  let listAllMoviesUseCase: ListAllMoviesUseCase;
  let movieRepositoryMock: jest.Mocked<MovieRepository>;

  const movieExample1: Movie = {
    id: '1',
    title: 'The Matrix',
    summary: 'A sci-fi movie about virtual reality',
    origin: 'USA',
    image: 'matrix.jpg',
    createdAt: new Date(),
  };

  const movieExample2: Movie = {
    id: '2',
    title: 'Inception',
    summary: 'A sci-fi movie about dreams within dreams',
    origin: 'USA',
    image: 'inception.jpg',
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
    listAllMoviesUseCase = new ListAllMoviesUseCase(movieRepositoryMock);
  });

  // Cenário 1: Deve retornar todos os filmes existentes
  it('should return all movies', async () => {
    // Simula o retorno de dois filmes do repositório
    movieRepositoryMock.findAll.mockResolvedValueOnce([movieExample1, movieExample2]);

    const result = await listAllMoviesUseCase.execute();

    // Verifica se o método findAll foi chamado
    expect(movieRepositoryMock.findAll).toHaveBeenCalled();

    // Verifica se o resultado é a lista de filmes simulada
    expect(result).toEqual([movieExample1, movieExample2]);
  });

  // Cenário 2: Deve retornar uma lista vazia quando não houver filmes
  it('should return an empty list when no movies are found', async () => {
    // Simula o retorno de uma lista vazia do repositório
    movieRepositoryMock.findAll.mockResolvedValueOnce([]);

    const result = await listAllMoviesUseCase.execute();

    // Verifica se o método findAll foi chamado
    expect(movieRepositoryMock.findAll).toHaveBeenCalled();

    // Verifica se o resultado é uma lista vazia
    expect(result).toEqual([]);
  });
});
