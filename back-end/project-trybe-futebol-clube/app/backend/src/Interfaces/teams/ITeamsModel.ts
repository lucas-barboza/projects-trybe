import ITeams from '../ITeams';
// import { NewEntity } from '..';

export default interface ITeamsModel {
  findAll(): Promise<ITeams[]>,
  findById(id: ITeams['id']): Promise<ITeams | null>,
}
