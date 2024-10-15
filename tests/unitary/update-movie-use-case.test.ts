import { UpdateMovieUseCase } from "../../src/application/use-cases/update-movie-use-case";
import { MovieRepository } from "../../src/application/repositories/movie-repository";
import { Movie } from "../../src/domain/movie";

describe('UpdateMovieUseCase', () => {
  let updateMovieUseCase: UpdateMovieUseCase;
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
    updateMovieUseCase = new UpdateMovieUseCase(movieRepositoryMock);
  });

  // Cenário 1: Deve atualizar um filme existente
  it('should update an existing movie', async () => {
    const updatedMovie = {
      ...movieExample,
      title: "The Matrix Reloaded", // Atualiza apenas o título
    };
  
    movieRepositoryMock.findById.mockResolvedValueOnce(movieExample);
    movieRepositoryMock.update.mockResolvedValueOnce(updatedMovie);
  
    const result = await updateMovieUseCase.execute('1', { title: "The Matrix Reloaded" });
  
    // Verifica se o método findById e update foram chamados com os valores corretos
    expect(movieRepositoryMock.findById).toHaveBeenCalledWith('1');
    expect(movieRepositoryMock.update).toHaveBeenCalledWith('1', expect.objectContaining({ title: "The Matrix Reloaded" }));
  
    // Verifica se o resultado é o filme atualizado
    expect(result).toEqual(updatedMovie);
  });
  

  // Cenário 2: Deve retornar null se o filme não for encontrado
  it('should return null if movie is not found', async () => {
    // Simula que o filme não foi encontrado
    movieRepositoryMock.findById.mockResolvedValueOnce(null);

    const result = await updateMovieUseCase.execute('2', { title: "New Title" });

    // Verifica se o método findById foi chamado
    expect(movieRepositoryMock.findById).toHaveBeenCalledWith('2');

    // Verifica se o método update não foi chamado
    expect(movieRepositoryMock.update).not.toHaveBeenCalled();

    // Verifica se o resultado é null
    expect(result).toBeNull();
  });
});
