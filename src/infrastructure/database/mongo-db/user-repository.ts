import { UserRepository } from "../../../application/repositories/user-repository";
import { User } from "../../../domain/user";
import { UserModel } from "./model";

export class MongoUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    const newUser = new UserModel(user);
    await newUser.save();
  }

  async findByEmail(email: string) {
    const user = await UserModel.findOne({ email });
    if (user) {
      return user;
    }

    return null;
  }
}