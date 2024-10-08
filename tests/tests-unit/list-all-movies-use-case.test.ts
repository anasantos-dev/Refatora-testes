import { ListAllMoviesUseCase } from '../../src/application/use-cases/list-all-movies-use-case';
import { MovieRepository } from '../../src/application/repositories/movie-repository';
import { Movie } from '../../src/domain/movie';

describe('ListAllMoviesUseCase', () => {
  let movieRepository: MovieRepository;
  let listAllMoviesUseCase: ListAllMoviesUseCase;

  beforeEach(() => {
    movieRepository = {
      findAll: jest.fn(),
    } as any;  // Simulação do repositório
    listAllMoviesUseCase = new ListAllMoviesUseCase(movieRepository);
  });

  // Cenário 1: Quando filmes são retornados com sucesso
  it('should return a list of movies', async () => {
    const mockMovies: Movie[] = [
      { id: '1', title: 'Movie 1', summary: 'Summary 1', origin: 'USA', image: 'url1', createdAt: new Date() },
      { id: '2', title: 'Movie 2', summary: 'Summary 2', origin: 'UK', image: 'url2', createdAt: new Date() }
    ];

    (movieRepository.findAll as jest.Mock).mockResolvedValue(mockMovies);  // Simulação de retorno de filmes

    const movies = await listAllMoviesUseCase.execute();

    expect(movies).toEqual(mockMovies);  // Verifica se o retorno está correto
  });

  // Cenário 2: Quando não há filmes
  it('should return an empty list if no movies are found', async () => {
    (movieRepository.findAll as jest.Mock).mockResolvedValue([]);  // Simulação de lista vazia

    const movies = await listAllMoviesUseCase.execute();

    expect(movies).toEqual([]);  // Verifica se o retorno é uma lista vazia
  });
});
