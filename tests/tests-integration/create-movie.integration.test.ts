import { connectDB, disconnectDB } from '../../src/infrastructure/database/mongo-db/connection';
import { CreateMoviesUseCase } from '../../src/application/use-cases/create-movies-use-case';
import { MovieRepository } from '../../src/application/repositories/movie-repository';
import { MovieModel } from '../../src/infrastructure/database/mongo-db/model';

describe('CreateMovie Integration Test', () => {
  let createMoviesUseCase: CreateMoviesUseCase;

  beforeAll(async () => {
    await connectDB();  // Conectando ao banco de dados de teste
    const movieRepository = new MovieModel() as unknown as MovieRepository;
    createMoviesUseCase = new CreateMoviesUseCase(movieRepository);
  });

  afterAll(async () => {
    await disconnectDB();  // Desconectando do banco de dados após o teste
  });

  afterEach(async () => {
    await MovieModel.deleteMany({});  // Limpando a coleção após cada teste
  });

  it('should create a movie and save it to the database', async () => {
    const movieParams = {
      title: "The Pragmatic Programmer",
      summary: "Andrew Hunt",
      origin: "978-0201616224",
      image: "Addison-Wesley"
    };

    // Executa o caso de uso para criar o filme
    const result = await createMoviesUseCase.execute(movieParams);

    // Verifica se o filme foi salvo corretamente no banco de dados
    const savedMovie = await MovieModel.findOne({ title: movieParams.title });
    expect(savedMovie).not.toBeNull();

    // Verifica se o savedMovie não é nulo antes de acessar suas propriedades
    if (savedMovie) {
      expect(savedMovie.title).toBe(movieParams.title); // Acessa as propriedades apenas se o filme não for null
    }
      // Verifica se o resultado do createMoviesUseCase corresponde aos parâmetros fornecidos
      expect(result).toMatchObject({
        createdAt: expect.any(Date),
        ...movieParams,
      });    
  });
});
