import { Request, Response } from 'express';
import { CreateUserUseCase } from '../application/use-cases/user/create-user-use-case';

export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase
    ){}

    create(req: Request, res: Response) {
        const params = req.body;
        const user = this.createUserUseCase.execute(params.email);
        res.status(201).json(user);
    }
}