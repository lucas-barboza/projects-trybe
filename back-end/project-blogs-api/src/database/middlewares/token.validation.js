const userService = require('../services/login.service');

const jwt = require('./token.middleware');

const tokenValidate = (req, res, next) => {
  const result = req.headers.authorization;

  if (!result) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const user = jwt.jwtValidation(result);

  if (user === undefined) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  res.locals.user = user;

  return next();
};

const error401 = (error, req, res, next) => {
  res.status(error.status || 401).json({ message: error.message });

  next();
};

const userValidation = async (req, res, next) => {
  const { userId } = req;

  const userFind = await userService.getUserById({ id: userId });

  if (userFind.id !== userId) return res.status(401).json({ message: 'Unauthorized user' });

  next();
};

module.exports = {
  tokenValidate,
  error401,
  userValidation,
};