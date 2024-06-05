import jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'jwt_secret';

export type SignType = {
  id: number,
  email: string,
};

export type Token = {
  token: string,
};

export type Role = {
  role: string,
};

const sign = (user: SignType): string => {
  const token = jwt.sign(user, secret);
  return token;
};

const validateToken = (token: string) => {
  try {
    const response = jwt.verify(token, secret);
    return response;
  } catch (e) {
    return false;
  }
};

export default { sign, validateToken };
