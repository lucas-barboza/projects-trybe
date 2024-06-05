import IUsers from '../IUsers';
// import { NewEntity } from '..';

export default interface IUsersModel {
  findEmail(email: IUsers['email']): Promise<IUsers | null>,
}
