import SequelizeTeams from '../database/models/teams.model';
import SequelizeMatches from '../database/models/matches.model';
import IMatches from '../Interfaces/IMatches';
import IMatchesModel from '../Interfaces/matches/IMatchesModel';
import { NewEntity } from '../Interfaces';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatches[]> {
    const allTeams = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return allTeams;
  }

  async findAllMatchesInProgress(): Promise<IMatches[]> {
    const allTeams = await this.model.findAll({
      where: { inProgress: 1 },
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return allTeams;
  }

  async findAllMatchesNotInProgress(): Promise<IMatches[]> {
    const allTeams = await this.model.findAll({
      where: { inProgress: 0 },
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return allTeams;
  }

  async finishMatch(id: number): Promise<[affectedCount: number]> {
    const updatedMatch = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    return updatedMatch;
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<[affectedCount: number]> {
    const updatedMatch = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return updatedMatch;
  }

  async addMatch(match: NewEntity<IMatches>): Promise<IMatches | null> {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = match;

    const findHome = await this.model.findByPk(homeTeamId);
    const findAway = await this.model.findByPk(awayTeamId);
    if (!findHome || !findAway) return null;

    const inProgress = true;
    const dataNewMatach = { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
    const newMatch = await this.model.create(dataNewMatach);
    return newMatch;
  }

  async findByIdFinishesMatches(id: number, mode: string): Promise<IMatches[]> {
    if (mode === 'home') {
      const matchesNotInProgress = await this.model.findAll({
        where: {
          homeTeamId: id,
          inProgress: false,
        },
      });
      return matchesNotInProgress;
    }
    const matchesNotInProgress = await this.model.findAll({
      where: {
        awayTeamId: id,
        inProgress: false,
      },
    });
    return matchesNotInProgress;
  }
}
