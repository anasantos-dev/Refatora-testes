import { MovieRepository } from "../repositories/movie-repository";
import { Movie } from "../../domain/movie";

export class CreateMoviesUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(params: Movie): Promise<Movie> {
    // Validação para garantir que todos os parâmetros estão presentes
    if (!params.title || !params.summary || !params.origin || !params.image) {
      throw new Error('Todos os campos (title, summary, origin, image) são obrigatórios.');
    }

    // Cria o filme com a data atual
    const movieToCreate: Movie = {
      ...params,
      createdAt: new Date(),
    };

    // Salva o filme usando o repositório
    return await this.movieRepository.save(movieToCreate);
  }
}
