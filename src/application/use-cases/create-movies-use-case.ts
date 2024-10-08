import { Movie } from "../../domain/movie";
import { MovieRepository } from "../repositories/movie-repository";

// Parâmetros necessários para criar um filme
export interface Params {
  title: string;  
  summary: string;
  origin: string;
  image: string;
}
// Classe que define o caso de uso de criar um filme
export class CreateMoviesUseCase {
// O repositório é injetado via construtor, para que possamos simular ele no teste
  constructor(private  readonly movieRepository: MovieRepository) {}

// Método principal que executa a criação do filme
  async execute(movieParams: Params): Promise<Movie> {
    const movie: Movie = {
      createdAt: this.getDate(),
      ...movieParams,// Adiciona os parâmetros do filme
    };
    // Salva o filme no repositório  
    await this.movieRepository.save(movie);

    return movie;
  }
  private getDate() {
    return new Date();
  }
}
