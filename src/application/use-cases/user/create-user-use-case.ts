import { UserRepository } from '../../repositories/user-repository';
import { User } from '../../../domain/user'

export interface UserParams {
  title: string;
  summary: string;
  origin: string;
  image: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userParams: UserParams): Promise<User> {
    const user: User = {
      createdAt: this.getDate(),
      ...userParams,  // Certifique-se de que todos os parâmetros necessários estão presentes
    };

    await this.userRepository.save(user);
    return user;
  }

  private getDate() {
    return new Date();
  }
}

