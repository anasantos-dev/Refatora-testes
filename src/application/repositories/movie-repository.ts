import { Movie } from '../../domain/movie';

export interface MovieRepository {
    save(movie: Movie): Promise<Movie>;
    findAll():Promise<Movie[]>;
    findById(id:string): Promise<Movie | null>;
    delete(id:string): void;
    update(id:string, updatedMovie: Partial<Movie>):Promise<Movie | null>;

   }