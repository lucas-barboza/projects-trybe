import { NewEntity } from '../Interfaces';
import MatchesModel from '../models/matches.model';
import IMatches from '../Interfaces/IMatches';
import IMatchesModel from '../Interfaces/matches/IMatchesModel';
import { ServiceResponse/* , ServiceMessage */ } from '../Interfaces/ServiceMessage';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getAllMatchesInProgress(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAllMatchesInProgress();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getAllMatchesNotInProgress(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAllMatchesNotInProgress();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<IMatches>> {
    const updatedMatch = await this.matchesModel.finishMatch(id);

    if (!updatedMatch) return { status: 'NOT_FOUND', data: { message: 'Not found match' } };
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<[affectedCount: number]>> {
    const updatedMatch = await this.matchesModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    if (!updatedMatch) return { status: 'NOT_FOUND', data: { message: 'Not found match' } };
    return { status: 'SUCCESSFUL', data: updatedMatch };
  }

  public async addMatch(match: NewEntity<IMatches>): Promise<ServiceResponse<IMatches>> {
    const createMatch = await this.matchesModel.addMatch(match);

    if (!createMatch) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    return { status: 'CREATED', data: createMatch };
  }
}
