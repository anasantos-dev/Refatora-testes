import { MovieRepository } from '../repositories/movie-repository';

export class ListAllMoviesUseCase {
constructor (
    private movieRepository: MovieRepository
) {}
 execute() {
  const movies = this.movieRepository.findAll();
   return movies;
  }
 }