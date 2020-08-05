import { Router } from 'express';

import AuthMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';

const router = Router();

router.post('/users', UserController.store);
router.post('/auth', AuthController.store);
router.get('/users', AuthMiddleware, UserController.index);

export default router;