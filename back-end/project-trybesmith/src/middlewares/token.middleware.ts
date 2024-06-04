import jwt, { sign, SignOptions, Secret } from 'jsonwebtoken';
import IUser from '../interfaces/user.interface';

const secret = 'secret';
const jwtConfig: SignOptions = { expiresIn: '7d', algorithm: 'HS256' };

const jwtToken = {

  create: (data: IUser) => {
    const token = sign({ data }, secret, jwtConfig);
    return token;
  },

  loginToken: (id: number): string => {
    const Nsecret: Secret = 'mysupersecret';

    const token = jwt.sign({ id }, Nsecret, jwtConfig);

    return token;
  },

};

export default jwtToken;