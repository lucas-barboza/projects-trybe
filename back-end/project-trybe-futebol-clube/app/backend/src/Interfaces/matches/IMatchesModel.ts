import IMatches from '../IMatches';
import { NewEntity } from '..';

export default interface IMatchesModel {
  findAll(): Promise<IMatches[]>,
  findAllMatchesInProgress(): Promise<IMatches[]>,
  findAllMatchesNotInProgress(): Promise<IMatches[]>,
  finishMatch(id: number): Promise<[affectedCount: number]>,
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<[affectedCount: number]>,
  addMatch(match: NewEntity<IMatches>): Promise<IMatches | null>,
  findByIdFinishesMatches(id: number, mode: string): Promise<IMatches[]>,
}
