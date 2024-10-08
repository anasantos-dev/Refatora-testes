import { Request, Response } from "express";
import { CreateMoviesUseCase } from "../application/use-cases/create-movies-use-case";
import { ListAllMoviesUseCase } from '../application/use-cases/list-all-movies-use-case';
import { ListMovieByIdUseCase } from '../application/use-cases/list-movie-by-id-use-case';
import { DeleteMovieUseCase } from '../application/use-cases/delete-movie-use-case';
import { UpdateMovieUseCase } from '../application/use-cases/update-movie-use-case';

export interface CreateMovieDTO {
  title: string;
  summary: string;
  origin: string;
  image: string;
  status: "read" | "unread" | "donated";
}

interface MovieDTO {
  id: string;
  title: string;
  summary: string;
  origin: string;
  image: string;
  createdAt: string;
  status: "read" | "unread" | "donated";
}

export class MovieController {
  constructor(
    private readonly createMoviesUseCase: CreateMoviesUseCase,
    private readonly listAllMoviesUseCase: ListAllMoviesUseCase,
    private readonly listMovieByIdUseCase: ListMovieByIdUseCase,
    private readonly deleteMovieUseCase: DeleteMovieUseCase,
    private readonly updateMovieUseCase: UpdateMovieUseCase
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const movieData: CreateMovieDTO = req.body;
      const movie = await this.createMoviesUseCase.execute(movieData);
      res.status(201).json(movie);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async listAll(req: Request, res: Response): Promise<void> {
    try {
      const movies = await this.listAllMoviesUseCase.execute();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getMovieById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id; // Obtém o ID da URL
      const movie = await this.listMovieByIdUseCase.execute(id); // Busca pelo ID
  
      if (!movie) {
        res.status(404).json({ message: 'Filme não encontrado' });
      } else {
        res.status(200).json(movie); // Retorna o filme específico
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar o filme', error });
    }
  }
  

  async deleteMovieById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      await this.deleteMovieUseCase.execute(id);
      res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting movie', error });
    }
  }

  async updateMovie(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const updatedData = req.body;

      const updatedMovie = await this.updateMovieUseCase.execute(id, updatedData);

      if (!updatedMovie) {
        res.status(404).json({ message: 'Movie not found' });
      } else {
        res.status(200).json(updatedMovie);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating movie', error });
    }
  }
}
