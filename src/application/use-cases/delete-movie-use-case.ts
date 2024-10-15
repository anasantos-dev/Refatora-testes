import { MovieRepository } from '../repositories/movie-repository';
import { Movie } from '../../domain/movie'

export class DeleteMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: string): Promise<Movie | null> {
    const movie = await this.movieRepository.findById(id);
    if (!movie) {
      return null;
    }
    await this.movieRepository.delete(id);
    return movie;
  }
}
