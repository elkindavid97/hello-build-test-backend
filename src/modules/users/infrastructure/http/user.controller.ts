import type { Request, Response } from 'express';
import { handleResult } from '../../../../core/utils/result';
import type { UsersService } from '../../application/user.service';
import type { LoginReq, UserReq } from './user.schema';

export class UsersController {
  private readonly usersService;

  constructor(dependencies: { usersService: UsersService }) {
    this.usersService = dependencies.usersService;
  }

  createUser = async (req: Request, res: Response): Promise<void> => {
    const userData: UserReq = req.body;

    const newUser = await this.usersService.createUser(userData);

    handleResult(res, newUser, 201);
  };

  getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    const users = await this.usersService.getAllUsers();

    handleResult(res, users, 200);
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.user;
    const user = await this.usersService.getUserById(id);

    handleResult(res, user, 200);
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const userData: LoginReq = req.body;

    const loggedUser = await this.usersService.login(userData);

    handleResult(res, loggedUser, 200);
  };
}
