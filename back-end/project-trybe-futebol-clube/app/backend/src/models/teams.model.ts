import SequelizeTeams from '../database/models/teams.model';
import ITeams from '../Interfaces/ITeams';
import ITeamsModel from '../Interfaces/teams/ITeamsModel';
// import { NewEntity } from '../Interfaces';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const allTeams = await this.model.findAll();
    return allTeams;
  }

  async findById(paramId: ITeams['id']): Promise<ITeams | null> {
    const teamById = await this.model.findByPk(paramId);
    if (teamById == null) return null;

    const { id, teamName }: ITeams = teamById;
    return { id, teamName };
  }
}
