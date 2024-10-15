import { DeleteMovieUseCase } from "../../src/application/use-cases/delete-movie-use-case";
import { MovieRepository } from "../../src/application/repositories/movie-repository";
import { Movie } from "../../src/domain/movie";

describe('DeleteMovieUseCase', () => {
  let deleteMovieUseCase: DeleteMovieUseCase;
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
    // Criando um mock explícito para o repositório
    movieRepositoryMock = {
      findById: jest.fn(),
      delete: jest.fn().mockResolvedValue(undefined), // Simula retorno undefined
      save: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    } as jest.Mocked<MovieRepository>;

    // Instanciando o caso de uso com o repositório mockado
    deleteMovieUseCase = new DeleteMovieUseCase(movieRepositoryMock);
  });

  // Cenário 1: Deve deletar um filme existente
  it('should delete an existing movie', async () => {
    // Simula encontrar o filme
    movieRepositoryMock.findById.mockResolvedValueOnce(movieExample);

    // Executa o caso de uso de deleção
    const result = await deleteMovieUseCase.execute('1');

    // Verifica se o método findById e delete foram chamados com o ID correto
    expect(movieRepositoryMock.findById).toHaveBeenCalledWith('1');
    expect(movieRepositoryMock.delete).toHaveBeenCalledWith('1');

    // Verifica se o filme retornado é o mesmo que foi deletado
    expect(result).toEqual(movieExample);
  });

  // Cenário 2: Deve retornar `null` se o filme não for encontrado
  it('should return null if movie is not found', async () => {
    // Simula que o filme não foi encontrado
    movieRepositoryMock.findById.mockResolvedValueOnce(null);

    const result = await deleteMovieUseCase.execute('2');

    // Verifica se o método findById foi chamado
    expect(movieRepositoryMock.findById).toHaveBeenCalledWith('2');

    // Verifica se o método delete não foi chamado
    expect(movieRepositoryMock.delete).not.toHaveBeenCalled();

    // Verifica se o resultado é null
    expect(result).toBeNull();
  });
});
