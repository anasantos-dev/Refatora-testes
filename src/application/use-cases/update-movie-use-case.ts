import { MovieRepository } from '../repositories/movie-repository';
import { Movie } from '../../domain/movie';

export class UpdateMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: string, updatedMovie: Partial<Movie>): Promise<Movie | null> {
    const movie = await this.movieRepository.findById(id);
    if (!movie) {
      throw new Error('Movie not found');
    }
    return await this.movieRepository.update(id, updatedMovie);
  }


}
