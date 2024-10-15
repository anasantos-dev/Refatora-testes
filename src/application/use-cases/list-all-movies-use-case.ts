import { Movie } from '../../domain/movie';
import { MovieRepository } from '../repositories/movie-repository';

export class ListAllMoviesUseCase {
 
  constructor(
    private readonly movieRepository: MovieRepository
  ) {}

  async execute(): Promise<Array<Movie >> {
    return await this.movieRepository.findAll();
  }

}