import type { ResultPromise } from '../../../core/utils/result';
import type { UserByEmailLoginResDto, UserResDto } from '../application/dtos';
import type { UserReq } from '../infrastructure/http/user.schema';

export interface UsersRepository {
  create: (user: UserReq) => ResultPromise<UserResDto>;
  findAll: () => ResultPromise<UserResDto[]>;
  findById: (id: string) => ResultPromise<UserResDto>;
  findByEmail: (email: string) => ResultPromise<UserByEmailLoginResDto>;
  updateToken: (id: string, token: string) => ResultPromise<UserResDto>;
}
