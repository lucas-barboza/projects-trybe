import jwt, { Secret } from 'jsonwebtoken';

export default (token: string | undefined) => {
  if (!token) return { code: 401, message: 'Token not found' };

  const secret: Secret = 'mysupersecret';

  try {
    const verify = jwt.verify(token, secret);
    const { id } = verify as { id: number };
    return { id };
  } catch (_err) {
    return { code: 401, message: 'Invalid token' };
  }
};