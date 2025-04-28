import { eq } from 'drizzle-orm';
import { logger } from '../../../../core/utils/logger';
import { toDtoArray, toDtoObject } from '../../../../core/utils/mappers';
import { Result, ResultError, type ResultPromise } from '../../../../core/utils/result';
import type { db } from '../../../../db';
import { usersTable } from '../../../../db/schema';
import { UserByEmailLoginResDto, UserResDto } from '../../application/dtos';
import type { UsersRepository } from '../../domain/user.repository';
import type { UserReq } from '../http/user.schema';

export class UsersRepositoryPostgres implements UsersRepository {
  private readonly db;
  constructor(dependencies: { db: typeof db }) {
    this.db = dependencies.db;
  }

  async create(user: UserReq): ResultPromise<UserResDto> {
    try {
      const [users] = await this.db.insert(usersTable).values(user).returning();

      return Result.success(toDtoObject(UserResDto, users));
    } catch (error) {
      logger.error(error);
      return Result.failure(new ResultError('Error creating Users', 500));
    }
  }

  async findAll(): ResultPromise<UserResDto[]> {
    try {
      const users = await this.db.query.usersTable.findMany();

      return Result.success(toDtoArray(UserResDto, users));
    } catch (error) {
      logger.error(error);
      return Result.failure(new ResultError('Error getting Users', 500));
    }
  }

  async findById(id: string): ResultPromise<UserResDto> {
    try {
      const user = await this.db.query.usersTable.findFirst({
        where: eq(usersTable.id, id),
      });

      if (!user) {
        return Result.failure(new ResultError('User not found', 404));
      }

      return Result.success(toDtoObject(UserResDto, user));
    } catch (error) {
      logger.error(error);
      return Result.failure(new ResultError('Error getting User', 500));
    }
  }

  async findByEmail(email: string): ResultPromise<UserByEmailLoginResDto> {
    try {
      const user = await this.db.query.usersTable.findFirst({
        where: eq(usersTable.email, email),
      });

      if (!user) {
        return Result.failure(new ResultError('Email not found', 404));
      }

      return Result.success(toDtoObject(UserByEmailLoginResDto, user));
    } catch (error) {
      logger.error(error);
      return Result.failure(new ResultError('Error getting User', 500));
    }
  }

  async updateToken(id: string, token: string): ResultPromise<UserResDto> {
    try {
      const user = await this.db
        .update(usersTable)
        .set({ githubToken: token })
        .where(eq(usersTable.id, id))
        .returning();

      if (!user) {
        return Result.failure(new ResultError('User not found', 404));
      }

      return Result.success(toDtoObject(UserResDto, user[0]));
    } catch (error) {
      logger.error(error);
      return Result.failure(new ResultError('Error updating User', 500));
    }
  }
}
