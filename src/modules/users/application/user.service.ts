import { comparePassword, encrypt } from '../../../core/utils/bcrypt';
import { generateToken } from '../../../core/utils/jwt';
import { Result, ResultError, type ResultPromise } from '../../../core/utils/result';
import type { UsersRepository } from '../domain/user.repository';
import type { LoginReq, UserReq } from '../infrastructure/http/user.schema';
import type { UserByEmailLoginResDto, UserLoginResDto, UserResDto } from './dtos';

export class UsersService {
  private readonly usersRepo;

  constructor(dependencies: { usersRepository: UsersRepository }) {
    this.usersRepo = dependencies.usersRepository;
  }

  async createUser(userData: UserReq): ResultPromise<UserResDto> {
    const passHash = await encrypt(userData.password);
    userData.password = passHash;

    const user = await this.usersRepo.create(userData);

    return user;
  }

  async getAllUsers(): ResultPromise<UserResDto[]> {
    const users = await this.usersRepo.findAll();
    return users;
  }

  async getUserById(id: string): ResultPromise<UserResDto> {
    const user = await this.usersRepo.findById(id);
    return user;
  }

  async login(userData: LoginReq): ResultPromise<UserByEmailLoginResDto | UserLoginResDto> {
    const user = await this.usersRepo.findByEmail(userData.email);

    if (!user.isSuccess) {
      return user;
    }

    const { password, ...restUser } = user.isSuccess;

    const isCorrect = await comparePassword(userData.password, password);

    if (!isCorrect) {
      return Result.failure(new ResultError('Wrong password', 500));
    }

    const { id, email, name, githubToken } = user.isSuccess;
    const token = generateToken({ id, email, name, githubToken });

    const loginObject: UserLoginResDto = {
      ...restUser,
      token,
    };

    return Result.success(loginObject);
  }
}
