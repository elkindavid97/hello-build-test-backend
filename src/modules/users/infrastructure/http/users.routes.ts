import { Router } from 'express';
import container from '../../../../core/di-container/container';
import { validateRequest } from '../../../../core/middlewares';
import { validateSession } from '../../../../core/middlewares/session.middleware';
import type { UsersController } from './user.controller';
import { CreateUserSchema, LoginSchema } from './user.schema';

const router = Router();

const usersController: UsersController = container.resolve('usersController');

router.post('/', validateRequest({ body: CreateUserSchema }), usersController.createUser);
router.post('/login', validateRequest({ body: LoginSchema }), usersController.login);
router.get('/', validateSession, usersController.getUserById);

export default router;
