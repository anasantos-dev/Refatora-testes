import { Request, Response } from "express";
import { CreateUserUseCase } from "../application/use-cases/user/create-user-use-case";
import { FindUserUseCase } from "../application/use-cases/user/find-user-use-case";

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private findUserUseCase: FindUserUseCase
  ) {}

  async create(req: Request, res: Response) {
    const params = req.body;

    if (
      params.email === "" ||
      params.password === "" ||
      !params.email ||
      !params.password
    ) {
      return res
        .status(400)
        .json({ message: "Campos Email e senha são obrigatórios." });
    }

    const user = await this.createUserUseCase.execute(params);
    res.status(201).json(user);
  }

  async getUserByEmail(req: Request, res: Response) {
    const { email } = req.params;
    const user = await this.findUserUseCase.execute(email);
    res.status(200).json(user);
  }
}