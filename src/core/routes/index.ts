import { Router } from 'express';
import githubReposRoutes from '../../modules/githubRepos/infrastructure/http/github.repos.routes';
import userRoutes from '../../modules/users/infrastructure/http/users.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/github', githubReposRoutes);

export default router;
