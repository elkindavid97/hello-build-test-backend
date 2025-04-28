import type { ResultPromise } from '../../../core/utils/result';

export interface GithubRepository {
  exchangeCodeForToken: (code: string) => ResultPromise<string>;
  getUserRepos: (token: string) => ResultPromise<unknown>;
  getStarredRepos: (token: string) => ResultPromise<unknown>;
}
