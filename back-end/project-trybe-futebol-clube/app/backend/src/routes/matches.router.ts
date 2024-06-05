import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/matches.controller';
import loginValidation from '../middlewares/login.validation';
import matchesValidation from '../middlewares/matches.validation';

const matchesController = new MatchesController();

const router = Router();

router.patch(
  '/:id',
  loginValidation.validateToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);
router.patch(
  '/:id/finish',
  loginValidation.validateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);
router.post(
  '/',
  loginValidation.validateToken,
  matchesValidation.validateMatch,
  (req: Request, res: Response) => matchesController.addMatchInProgressMatch(req, res),
);
router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
export default router;
