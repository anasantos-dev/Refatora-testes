import { Repository } from "../database/mongo-db/repository";
import { MovieController } from "../../interface/movie-controller";

import { CreateMoviesUseCase } from "../../application/use-cases/create-movies-use-case";
import { ListAllMoviesUseCase } from "../../application/use-cases/list-all-movies-use-case";
import { ListMovieByIdUseCase } from "../../application/use-cases/list-movie-by-id-use-case";
import { DeleteMovieUseCase } from "../../application/use-cases/delete-movie-use-case";
import { UpdateMovieUseCase } from "../../application/use-cases/update-movie-use-case";

export function configureDependencies() {
  const movieRepository = new Repository();

  const createMoviesUseCase = new CreateMoviesUseCase(movieRepository);
  const listMoviesUseCase = new ListAllMoviesUseCase(movieRepository);
  const listMovieByIdUseCase = new ListMovieByIdUseCase(movieRepository);
  const deleteMovieUseCase = new DeleteMovieUseCase(movieRepository);
  const updateMovieUseCase = new UpdateMovieUseCase(movieRepository);
  const movieController = new MovieController(createMoviesUseCase,listMoviesUseCase,listMovieByIdUseCase,deleteMovieUseCase,updateMovieUseCase);

  return {
    movieController,
  };
}
