// import { NewEntity } from '../Interfaces';
import TeamsModel from '../models/teams.model';
import ITeams from '../Interfaces/ITeams';
import ITeamsModel from '../Interfaces/teams/ITeamsModel';
import { ServiceResponse/* , ServiceMessage */ } from '../Interfaces/ServiceMessage';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(paramId: number): Promise<ServiceResponse<ITeams>> {
    const teamById = await this.teamsModel.findById(paramId);
    if (!teamById) return { status: 'NOT_FOUND', data: { message: `Team ${paramId} not found` } };
    return { status: 'SUCCESSFUL', data: teamById };
  }
}
