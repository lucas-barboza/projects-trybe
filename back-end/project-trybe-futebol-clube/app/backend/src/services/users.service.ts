// import { NewEntity } from '../Interfaces';
import * as bcrypt from 'bcryptjs';
import UsersModel from '../models/users.model';
import IUsers from '../Interfaces/IUsers';
import IUsersModel from '../Interfaces/users/IUsersModel';
import { ServiceResponse/* , ServiceMessage */ } from '../Interfaces/ServiceMessage';
import jwtUtils, { Token, Role } from '../utils/jwt.utils';

export default class UsersService {
  constructor(
    private usersModel: IUsersModel = new UsersModel(),
  ) { }

  public async getUserByEmail(email: IUsers['email'], password: IUsers['password']):
  Promise<ServiceResponse<Token>> {
    const findUser = await this.usersModel.findEmail(email);

    if (!findUser || !bcrypt.compareSync(password, findUser.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const { id } = findUser;
    const token = jwtUtils.sign({ id, email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getUserRole(email: string):
  Promise<ServiceResponse<Role>> {
    const user = await this.usersModel.findEmail(email);

    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
