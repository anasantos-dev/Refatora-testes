import { MovieRepository } from "../../../application/repositories/movie-repository";
import { Movie } from "../../../domain/movie";
import { MovieModel } from "./model";

  export class Repository implements MovieRepository {
    // Método para salvar um filme no MongoDB, retornando o filme salvo
    async save(movie: Movie): Promise<Movie> {
      const newMovie = new MovieModel(movie);
      const savedMovie = await newMovie.save(); 
      return savedMovie; // Retorna o filme salvo
    }
  
    // Método para listar todos os filmes
  async findAll(): Promise<Movie[]> {
    return await MovieModel.find();
  }

  // Método para buscar um filme por ID
  async findById(id: string): Promise<Movie | null> {
    return await MovieModel.findById(id);
  }

  // Método para deletar um filme por ID
  async delete(id: string): Promise<Movie | null> {
    const deletedMovie = await MovieModel.findByIdAndDelete(id);
    return deletedMovie; // Retorna o filme deletado ou null se não for encontrado
  }

  // Método para atualizar um filme por ID
  async update(id: string, updatedMovie: Partial<Movie>): Promise<Movie | null> {
    const updated = await MovieModel.findByIdAndUpdate(id, updatedMovie, { new: true });
    return updated; // Retorna o filme atualizado
  }
}
