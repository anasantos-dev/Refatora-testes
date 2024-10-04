import { MovieRepository } from '../repositories/movie-repository';
export class DeleteMovieUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(id: string): Promise<void> {
    const movie = this.movieRepository.findById (id)

    if (!movie) {
      throw new Error('Movie not found');
    }

    this.movieRepository.delete(id);
  }
}