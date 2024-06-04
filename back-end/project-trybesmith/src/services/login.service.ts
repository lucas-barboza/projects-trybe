import UserModel from '../models/user.model';
import validLogin from '../middlewares/token.middleware';

const getLogin = {
  login: async (username: string, password:string) => {
    if (!username) return { code: 400, message: '"username" is required' };
    if (!password) return { code: 400, message: '"password" is required' };

    const user = await UserModel.getUser(username);

    if (user === null || user.password !== password) {
      return { code: 401, message: 'Username or password invalid' };
    }

    const token = validLogin.loginToken(user.id);

    return { code: 200, token };
  },
};

export default getLogin;