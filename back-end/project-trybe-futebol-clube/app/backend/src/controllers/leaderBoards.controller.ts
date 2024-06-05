import { Request, Response } from 'express';
import LeaderBoardsService from '../services/leaderBoards.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderBoardsController {
  constructor(
    private leaderBoardsService = new LeaderBoardsService(),
  ) { }

  public async getHomeTeamsPerformece(_req: Request, res: Response, mode: string) {
    const serviceResponse = await this.leaderBoardsService.getTeamsPerformece(mode);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getClassify(_req: Request, res: Response) {
    const serviceResponse = await this.leaderBoardsService.getAllClassify();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
