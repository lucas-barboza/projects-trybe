// import { NewEntity } from '../Interfaces';
import TeamsModel from '../models/teams.model';
import ILeaderBoards from '../Interfaces/ILeaderBoards';
import ITeamsModel from '../Interfaces/teams/ITeamsModel';
import { ServiceResponse/* , ServiceMessage */ } from '../Interfaces/ServiceMessage';
// import IMatches from '../Interfaces/IMatches';
import LeaderBoardUtils from '../utils/LeaderBoards/leaderBoards.utils';
// import SequelizeMatches from '../database/models/matches.model';
import MatchesModel from '../models/matches.model';
import IMatchesModel from '../Interfaces/matches/IMatchesModel';

export default class LeaderBoardsService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) { }

  public async getAllClassify(): Promise<ServiceResponse<ILeaderBoards[]>> {
    const homeTeams = await this.getLeaderBoards('home');
    const awayTeams = await this.getLeaderBoards('away');
    const classify = LeaderBoardUtils.classify(homeTeams, awayTeams);
    return { status: 'SUCCESSFUL', data: classify };
  }

  public async getLeaderBoards(mode: string): Promise<ILeaderBoards[]> {
    const allTeam = await this.teamsModel.findAll();
    const teamsMatchesResults = allTeam.map(async (team) => {
      const allMatches = await this.matchesModel.findByIdFinishesMatches(team.id, mode);
      return LeaderBoardUtils
        .formatterForLeaderBoardModel(team.teamName, allMatches, team.id, mode);
    });
    const result = await Promise.all(teamsMatchesResults); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    const classify = LeaderBoardUtils.updateClassify(result);
    return classify;
  }

  public async getTeamsPerformece(mode: string): Promise<ServiceResponse<ILeaderBoards[]>> {
    const classify = await this.getLeaderBoards(mode);
    return { status: 'SUCCESSFUL', data: classify };
  }
}
