import { Request, Router, Response } from 'express';
import UsersController from '../controllers/users.controller';
import loginValidation from '../middlewares/login.validation';

const usersController = new UsersController();

const router = Router();

router.post(
  '/',
  loginValidation.validateLogin,
  (req: Request, res: Response) => usersController.findUserByEmail(req, res),
);
router.get(
  '/role',
  loginValidation.validateToken,
  (req: Request, res: Response) => usersController.findUserRole(req, res),
);
export default router;
