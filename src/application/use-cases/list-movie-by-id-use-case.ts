import { MovieRepository } from '../repositories/movie-repository';
import { Movie } from '../../domain/movie';

export class ListMovieByIdUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: string): Promise<Movie | null> {
    const movie = await this.movieRepository.findById(id);

    // Verifica se o filme foi encontrado e lança um erro se for null
    if (!movie) {
      throw new Error('Movie not found');
    }

    return movie;
  }
}
