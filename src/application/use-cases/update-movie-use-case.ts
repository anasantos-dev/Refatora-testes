 import { MovieRepository } from '../repositories/movie-repository';
 import { Movie } from '../../domain/movie';

 export class UpdateMovieUseCase {
   constructor(private movieRepository: MovieRepository) {}

  async execute(id: string, updatedData: Partial<Movie>): Promise<Movie | null> {
    const existingMovie = await this.movieRepository.findById(id);

    if (!existingMovie) {
      throw new Error('Movie not found');
    }

    return this.movieRepository.update(id, updatedData);
  }
}
