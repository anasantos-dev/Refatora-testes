import { MovieRepository } from '../repositories/movie-repository';
import { Movie } from '../../domain/movie';

export class ListAllMoviesUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(): Promise<Movie[]> {
    const movies = await this.movieRepository.findAll();
    return movies;
  }
}
