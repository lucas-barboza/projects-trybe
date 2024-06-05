import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamsController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const inProgress = req.query.inProgress as string | undefined;

    if (inProgress === 'true') {
      const serviceResponse = await this.matchesService.getAllMatchesInProgress();
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    if (inProgress === 'false') {
      const serviceResponse = await this.matchesService.getAllMatchesNotInProgress();
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    const serviceResponse = await this.matchesService.getAllMatches();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.matchesService.finishMatch(Number(id));
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const serviceResponse = await
    this.matchesService.updateMatch(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));

    if (serviceResponse.status === 'NOT_FOUND') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(mapStatusHTTP(serviceResponse.status)).json({ homeTeamGoals, awayTeamGoals });
  }

  public async addMatchInProgressMatch(req: Request, res: Response) {
    const serviceResponse = await this.matchesService.addMatch(req.body);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
