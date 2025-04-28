import axios from 'axios';
import { envs } from '../../../../core/config';
import { logger } from '../../../../core/utils/logger';
import { Result, ResultError, type ResultPromise } from '../../../../core/utils/result';
import type { GithubRepository } from '../../domain/github.repository.api';

export class GithubRepositoryAPI implements GithubRepository {
  async exchangeCodeForToken(code: string): ResultPromise<string> {
    try {
      const response = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: envs.GITHUB_CLIENT_ID,
          client_secret: envs.GITHUB_CLIENT_SECRET,
          code,
        },
        {
          headers: { Accept: 'application/json' },
        },
      );

      return Result.success(response.data.access_token);
    } catch (error) {
      logger.error(error);
      return Result.failure(new ResultError('Error exchanging code for token', 500));
    }
  }

  async getUserRepos(token: string): ResultPromise<unknown> {
    try {
      const response = await axios.get('https://api.github.com/user/repos', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      return Result.success(response.data);
    } catch (error) {
      logger.error(error);
      return Result.failure(new ResultError('Error getting repositories', 500));
    }
  }

  async getStarredRepos(token: string): ResultPromise<unknown> {
    try {
      const response = await axios.get('https://api.github.com/user/starred', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      return Result.success(response.data);
    } catch (error) {
      logger.error(error);
      return Result.failure(new ResultError('Error getting starred repositories', 500));
    }
  }
}
