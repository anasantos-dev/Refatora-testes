import { UpdateMovieUseCase } from '../../src/application/use-cases/update-movie-use-case';
import { MovieRepository } from '../../src/application/repositories/movie-repository';
import { Movie } from '../../src/domain/movie';

describe('UpdateMovieUseCase', () => {
  let movieRepository: MovieRepository;
  let updateMovieUseCase: UpdateMovieUseCase;

  beforeEach(() => {
    movieRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    } as any;  // Simulação do repositório
    updateMovieUseCase = new UpdateMovieUseCase(movieRepository);
  });

  // Cenário 1: Atualização com sucesso
  it('should update a movie if it exists', async () => {
    const mockMovie: Movie = { id: '1', title: 'Movie 1', summary: 'Summary 1', origin: 'USA', image: 'url', createdAt: new Date() };
    const updatedMovieData = { title: 'Updated Movie' };

    (movieRepository.findById as jest.Mock).mockResolvedValue(mockMovie);  // Simulação do filme encontrado
    (movieRepository.update as jest.Mock).mockResolvedValue({ ...mockMovie, ...updatedMovieData });  // Simulação da atualização

    const updatedMovie = await updateMovieUseCase.execute('1', updatedMovieData);

    expect(updatedMovie).toEqual({ ...mockMovie, ...updatedMovieData });  // Verifica se o filme foi atualizado corretamente
  });

  // Cenário 2: Filme não encontrado
  it('should throw an error if the movie does not exist', async () => {
    (movieRepository.findById as jest.Mock).mockResolvedValue(null);  // Simulação de filme não encontrado

    await expect(updateMovieUseCase.execute('1', { title: 'Updated Movie' })).rejects.toThrow('Movie not found');  // Verifica se o erro é lançado
  });
});
