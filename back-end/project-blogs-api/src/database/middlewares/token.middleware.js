const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

const createJwt = (user) => {
  const token = jwt.sign({ data: user }, secret, jwtConfig);

  return token;
};

const jwtValidation = (token) => {
  try {
    const validate = jwt.verify(token, secret);
    return validate;
  } catch (_err) {
    const e = new Error('Expired or invalid token');
    e.name = 'UnauthorizedError';
    throw e;
  }
};

module.exports = {
  createJwt,
  jwtValidation,
};