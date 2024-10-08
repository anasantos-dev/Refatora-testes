import { MovieRepository } from "../../../application/repositories/movie-repository";
import { Movie } from "../../../domain/movie";
import { MovieModel } from "./model";

export class Repository implements MovieRepository {
  // Método para salvar um filme
  async save(movie: Movie): Promise<void> {
    const newMovie = new MovieModel(movie);
    await newMovie.save();
  }

  // Método para listar todos os filmes
  async findAll(): Promise<Movie[]> {
    return await MovieModel.find();
  }

  // Método para buscar um filme por ID
  async findById(id: string): Promise<Movie | null> {
    return await MovieModel.findById(id);  // Se não encontrar, retorna null, o que é esperado
  }

  // Método para deletar um filme por ID
  async delete(id: string): Promise<void> {
    await MovieModel.findByIdAndDelete(id);
  }

  // Método para atualizar um filme por ID
  async update(id: string, updatedMovie: Partial<Movie>): Promise<Movie | null> {
    return await MovieModel.findByIdAndUpdate(id, updatedMovie, { new: true });
  }
}
