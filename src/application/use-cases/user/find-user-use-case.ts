import { User } from "../../../domain/user";
import { UserRepository } from "../../repositories/user-repository";

export class FindUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }
}