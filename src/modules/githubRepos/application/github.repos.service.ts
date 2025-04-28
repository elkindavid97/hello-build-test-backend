import { envs } from '../../../core/config';
import { Result, type ResultPromise } from '../../../core/utils/result';
import type { UserResDto } from '../../users/application/dtos';
import type { UsersRepository } from '../../users/domain/user.repository';
import type { GithubRepository } from '../domain/github.repository.api';

export class GithubReposService {
  private readonly githubRepo;
  private readonly usersRepo;

  constructor(dependencies: {
    githubRepository: GithubRepository;
    usersRepository: UsersRepository;
  }) {
    this.githubRepo = dependencies.githubRepository;
    this.usersRepo = dependencies.usersRepository;
  }

  getAuthorizationUrl(sessionToken: string): string {
    const clientId = envs.GITHUB_CLIENT_ID;
    return `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user&state=${sessionToken}`;
  }

  async exchangeCodeForToken(code: string): ResultPromise<string> {
    const accessToken = await this.githubRepo.exchangeCodeForToken(code);
    return accessToken;
  }

  async saveUserToken(userId: string, token: string): ResultPromise<UserResDto> {
    const user = await this.usersRepo.findById(userId);

    if (!user.isSuccess) {
      return Result.failure(user.isFailure);
    }

    const updatedUser = await this.usersRepo.updateToken(userId, token);
    return updatedUser;
  }

  async getUserRepos(userId: string): ResultPromise<unknown> {
    const user = await this.usersRepo.findById(userId);

    if (!user.isSuccess) {
      return user;
    }

    const token = user.isSuccess.githubToken ?? '';
    const repos = await this.githubRepo.getUserRepos(token);
    return repos;
  }

  async getStarredRepos(userId: string): ResultPromise<unknown> {
    const user = await this.usersRepo.findById(userId);

    if (!user.isSuccess) {
      return user;
    }

    const token = user.isSuccess.githubToken ?? '';
    const starredRepos = await this.githubRepo.getStarredRepos(token);
    return starredRepos;
  }
}
