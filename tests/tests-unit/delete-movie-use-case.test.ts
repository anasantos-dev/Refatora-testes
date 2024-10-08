import { DeleteMovieUseCase } from "../../src/application/use-cases/delete-movie-use-case"; // Caminho correto do seu arquivo de caso de uso
import { MovieRepository } from "../../src/application/repositories/movie-repository"; // Repositório simulado

describe("DeleteMovieUseCase", () => {
  let movieRepository: MovieRepository;
  let deleteMovieUseCase: DeleteMovieUseCase;

  beforeEach(() => {
    // Simulação do repositório
    movieRepository = {
      delete: jest.fn(),
      findById: jest.fn(),
    } as any; // Cast para o tipo MovieRepository

    // Instância do caso de uso com o repositório simulado
    deleteMovieUseCase = new DeleteMovieUseCase(movieRepository);
  });

  // Cenário 1: Quando o filme é encontrado e deletado com sucesso
  it("should delete a movie if it exists", async () => {
    (movieRepository.findById as jest.Mock).mockResolvedValue({
      id: "1",
      title: "Example Movie",
    }); // Simulação do filme encontrado

    await deleteMovieUseCase.execute("1");

    // Verifica se o método delete foi chamado com o ID correto
    expect(movieRepository.delete).toHaveBeenCalledWith("1");
  });

  // Cenário 2: Quando o filme não é encontrado
  it("should throw an error if the movie does not exist", async () => {
    (movieRepository.findById as jest.Mock).mockResolvedValue(null); // Simulação de filme não encontrado

    await expect(deleteMovieUseCase.execute("1")).rejects.toThrow(
      "Movie not found"
    ); // Verifica se o erro é lançado
  });

  // Cenário 3: Não deve chamar delete se o filme não existir
  it("should not call delete if the movie does not exist", async () => {
    (movieRepository.findById as jest.Mock).mockResolvedValue(null); // Simulação de filme não encontrado

    try {
      await deleteMovieUseCase.execute("2");
    } catch (error) {
      // Verifica se o método delete nunca foi chamado
      expect(movieRepository.delete).not.toHaveBeenCalled();
    }
  });

  // Cenário 4: Deve gerar um erro se um ID inválido for fornecido
  it("should throw an error if an invalid ID is provided", async () => {
    // Simulamos que a validação do ID ocorre no findById
    (movieRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(deleteMovieUseCase.execute("invalid_id")).rejects.toThrow(
      "Movie not found"
    );
  });
});
