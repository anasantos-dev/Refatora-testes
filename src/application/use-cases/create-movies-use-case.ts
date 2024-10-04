import { Movie } from "../../domain/movie";
import { MovieRepository } from "../repositories/movie-repository";

export interface Params {
  title: string;
  summary: string;
  origin: string;
  image: string;
}
export class CreateMovieUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(movieParams: Params): Promise<Movie> {
    const movie: Movie = {
      createdAt: this.getDate(),
      ...movieParams,
    };
    console.log("movie", movie);
    const movieCreated = await this.movieRepository.save(movie);

    return movie;
  }
  private getDate() {
    return new Date();
  }
}
