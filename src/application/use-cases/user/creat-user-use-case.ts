import { User } from "../../../domain/user";
import { UserRepository } from "../../repositories/user-repository";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userParams: User): Promise<User> {
    const user = {
      ...userParams,
    } as User;

    await this.userRepository.save(user);
    return user;
  }
}