import { Request, Response } from "express";
import { CreateMoviesUseCase } from "../application/use-cases/create-movies-use-case";
import { ListAllMoviesUseCase } from '../application/use-cases/list-all-movies-use-case';
import { ListMovieByIdUseCase } from '../application/use-cases/list-movie-by-id-use-case';
import { DeleteMovieUseCase } from '../application/use-cases/delete-movie-use-case';
import { UpdateMovieUseCase } from '../application/use-cases/update-movie-use-case';
import { Movie } from '../domain/movie'; 

export class MovieController {
  constructor(
    private readonly createMoviesUseCase: CreateMoviesUseCase,
    private readonly listAllMoviesUseCase: ListAllMoviesUseCase,
    private readonly listMovieByIdUseCase: ListMovieByIdUseCase,
    private readonly deleteMovieUseCase: DeleteMovieUseCase,
    private readonly updateMovieUseCase: UpdateMovieUseCase,
  ) {}

  async create(req: Request, res: Response) {
    const params: Movie = req.body;

    if (!params.title || !params.summary || !params.origin || !params.image) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const movie = await this.createMoviesUseCase.execute(params);
    res.status(201).json(movie);
  }

  async listAll(req: Request, res: Response) {
    const movies = await this.listAllMoviesUseCase.execute();
    res.json(movies);
  }

  // Ajuste no retorno de Promise<Response>
  async getMovieById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id; // Obtém o ID da URL
      const movie = await this.listMovieByIdUseCase.execute(id); // Busca pelo ID
  
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' }); // Retorna 404 se o filme não for encontrado
      }
  
      return res.status(200).json(movie); // Retorna 200 com o filme encontrado
    } catch (error) {
      console.error('Erro ao buscar o filme:', error); // Log para depuração
      return res.status(500).json({ message: 'Erro ao buscar o filme', error: (error as Error).message });
    }
  }
  

  async deleteMovieById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const movieFiltered = await this.deleteMovieUseCase.execute(id);

      if (!movieFiltered) {
        return res.status(404).json({ message: `Filme com id ${id} não encontrado.` });
      }

      return res.json({
        message: `Filme com id ${id} deletado com sucesso.`,
        movieFiltered,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar o filme.', error: (error as Error).message });
    }
  }

  async updateMovie(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const params = req.body;

      const movieUpdated = await this.updateMovieUseCase.execute(id, params);

      if (!movieUpdated) {
        return res.status(404).json({ message: `Filme com id ${id} não encontrado.` });
      }

      return res.json({
        message: `Filme com id ${id} atualizado com sucesso.`,
        movieUpdated,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar o filme.', error: (error as Error).message });
    }
  }
}
