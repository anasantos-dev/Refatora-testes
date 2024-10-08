import { MovieRepository } from '../repositories/movie-repository';

export class DeleteMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: string): Promise<void> {
    const movie = await this.movieRepository.findById (id)

    if (!movie) {
      throw new Error('Movie not found');
    }

   this.movieRepository.delete(id);
  }
}