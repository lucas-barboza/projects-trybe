import IToken from '../interfaces/token.interface';
import IUser from '../interfaces/user.interface';
import modelUser from '../models/user.model';
import jwtToken from '../middlewares/token.middleware';

const UserService = {
  create: async (data: IUser): Promise<IToken> => {
    const newUser = await modelUser.create(data);
    const token = jwtToken.create(newUser);
    return { token };
  },
};

export default UserService;