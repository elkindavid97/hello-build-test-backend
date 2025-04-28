import axios from 'axios';
import { Router } from 'express';
import container from '../../../../core/di-container/container';
import { validateSession } from '../../../../core/middlewares/session.middleware';
import type { GithubReposController } from './github.repos.controller';

const router = Router();

const githubReposController: GithubReposController = container.resolve('githubReposController');

router.get('/auth', githubReposController.initiateAuth);
router.get('/oauth/callback', githubReposController.handleCallback);
router.get('/repos', validateSession, githubReposController.getRepos);
router.get('/starred', validateSession, githubReposController.getStarredRepos);

export default router;
