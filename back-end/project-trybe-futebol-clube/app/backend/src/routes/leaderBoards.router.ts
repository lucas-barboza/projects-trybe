import { Request, Router, Response } from 'express';
import LeaderBoardsController from '../controllers/leaderBoards.controller';

const leaderBoardsController = new LeaderBoardsController();

const router = Router();

router.get('/', (req: Request, res: Response) => leaderBoardsController.getClassify(req, res));

router.get('/home', (req: Request, res: Response) => {
  const mode = 'home';
  leaderBoardsController.getHomeTeamsPerformece(req, res, mode);
});

router.get('/away', (req: Request, res: Response) => {
  const mode = 'away';
  leaderBoardsController.getHomeTeamsPerformece(req, res, mode);
});
export default router;
