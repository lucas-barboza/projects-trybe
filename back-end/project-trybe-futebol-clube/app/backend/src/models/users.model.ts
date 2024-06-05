import SequelizeUsers from '../database/models/users.model';
import IUsers from '../Interfaces/IUsers';
import IUsersModel from '../Interfaces/users/IUsersModel';
// import { NewEntity } from '../Interfaces';

export default class UsersModel implements IUsersModel {
  private model = SequelizeUsers;

  async findEmail(email: IUsers['email']): Promise<IUsers | null> {
    // console.log('Model:');
    const findEmailUser = await this.model.findOne({ where: { email } });
    // console.log(findEmailUser);
    if (!findEmailUser) return null;
    return findEmailUser.dataValues;
  }
}
