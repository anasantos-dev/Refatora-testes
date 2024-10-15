import { Movie } from '../../domain/movie';
import { MovieRepository } from '../repositories/movie-repository';

export class UpdateMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: string, params: Partial<Movie>): Promise<Movie | null> {
    const movie = await this.movieRepository.findById(id);
    if (!movie) {
      return null;
    }

    // Atualize os campos do filme e salve
    Object.assign(movie, params);
    await this.movieRepository.update(id, movie);
    
    return movie;
  }
}
