const { loginService } = require('../services');
const { User } = require('../models');
const jwt = require('../middlewares/token.middleware');

const loginUser = async (req, res) => {
  const token = await loginService.userLogin(req.body);

  return res.status(200).json({ token });
};

const getUser = async (email, password) => {
  const response = await User.findAll({
    where: {
      email,
      password,
    },
  });
  return response;
};

const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ 
      message: 'Some required fields are missing',
    });
  }

  const user = await getUser(email, password);
  if (!user.length) {
    return res.status(400).json({ 
      message: 'Invalid fields',
    });
  }
  return next();
};

const createUser = async (req, res) => {
  await loginService.createUser(req.body);

  const token = jwt.createJwt(req.body);
  return res.status(201).json({ token });
};

const nameValidation = (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res.status(400)
    .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  return next();
};

const emailValidation = (req, res, next) => {
  const { email } = req.body;

  const validate = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;

  if (email.match(validate)) {
    return next();
  }

  return res.status(400).json({ message: '"email" must be a valid email' });
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;

  if (password.length < 6) {
    return res.status(400)
    .json({ message: '"password" length must be at least 6 characters long' });
  }

  return next();
};

const getEmail = async (email) => {
  const result = await User.findAll({
    where: {
    email,
    },
  });
  return result;
};

const existingEmailValidation = async (req, res, next) => {
  const { email } = req.body;
  const user = await getEmail(email);

  if (user.length !== 0) {
    return res.status(409).json({ message: 'User already registered' });
  }

  return next();
};

const allUsers = async (req, res) => {
  const all = await loginService.allUsers();
  return res.status(200).json(all);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const [result] = await loginService.getUserById(id);

  if (!result) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  return res.status(200).json(result);
};

const delUser = async (req, res) => {
  await loginService.delUser(res.locals.user);

  return res.status(204).end();
};

module.exports = {
  loginUser,
  loginValidation,
  createUser,
  nameValidation,
  emailValidation,
  passwordValidation,
  existingEmailValidation,
  allUsers,
  getUserById,
  delUser,
};