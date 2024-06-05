import { Router } from 'express';
import teamsRouter from './teams.router';
import usersRouter from './users.router';
import matchesRouter from './matches.router';
import leaderBoardsRouter from './leaderBoards.router';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardsRouter);

export default router;
