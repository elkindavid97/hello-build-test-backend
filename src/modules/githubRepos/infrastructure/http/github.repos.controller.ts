import type { Request, Response } from 'express';
import { envs } from '../../../../core/config';
import { verifyToken } from '../../../../core/utils/jwt';
import { logger } from '../../../../core/utils/logger';
import { handleResult } from '../../../../core/utils/result';
import type { GithubReposService } from '../../application/github.repos.service';

export class GithubReposController {
  private readonly githubReposService;

  constructor(dependencies: { githubReposService: GithubReposService }) {
    this.githubReposService = dependencies.githubReposService;
  }

  initiateAuth = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
      res.status(400).json({ error: 'Missing token' });
      return;
    }

    const clientId = envs.GITHUB_CLIENT_ID;
    const redirectUri = `http://localhost:3000/api/v1/github/oauth/callback?token=${token}`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;

    res.redirect(githubAuthUrl);
  };

  handleCallback = async (req: Request, res: Response): Promise<void> => {
    try {
      const { code, token } = req.query;

      if (!code || !token || typeof token !== 'string') {
        res.status(400).json({ error: 'Missing code or token' });
        return;
      }

      const decoded = verifyToken(token);
      const userId = decoded.id;

      const accessTokenResult = await this.githubReposService.exchangeCodeForToken(code.toString());

      if (!accessTokenResult.isSuccess) {
        res.status(400).json({ error: 'Failed to get GitHub token' });
        return;
      }

      const accessToken = accessTokenResult.isSuccess;
      await this.githubReposService.saveUserToken(userId, accessToken);

      res.redirect(`${envs.FRONTEND_URL}/dashboard`);
    } catch (_error) {
      logger.error(_error);
      res.status(500).json({ error: 'GitHub authentication failed' });
    }
  };

  getRepos = async (req: Request, res: Response): Promise<void> => {
    const repos = await this.githubReposService.getUserRepos(req.user.id);

    handleResult(res, repos, 200);
  };

  getStarredRepos = async (req: Request, res: Response): Promise<void> => {
    const starredRepos = await this.githubReposService.getStarredRepos(req.user.id);

    handleResult(res, starredRepos, 200);
  };
}
