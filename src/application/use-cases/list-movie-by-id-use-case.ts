 import { MovieRepository } from '../repositories/movie-repository';
 import { Movie } from '../../domain/movie';

 export class ListMovieByIdUseCase {
   constructor(private movieRepository: MovieRepository) {}

   async execute(id: string): Promise<Movie | null> {
     return this.movieRepository.findById(id)
   }
 }