const jwt = require('../middlewares/token.middleware');
const { User } = require('../models');

const userLogin = async (data) => {
  const createToken = await jwt.createJwt(data);

  return createToken;
};

const createUser = async ({ displayName, email, password, image }) => {
  const createdUser = await User.create({ displayName, email, password, image });

  return createdUser;
};

const allUsers = async () => {
  const getAll = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });

  return getAll;
};

const getUserById = async (id) => {
  const findUser = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
    where: { id },
  });

  return findUser;
};

const delUser = async (data) => {
  const { email } = data.data;
  const [user] = await User.findAll({ where: { email } });
  const { id } = user.dataValues;
  const del = await User.destroy({ where: { id } });
  return del;
};

module.exports = {
  userLogin,
  createUser,
  allUsers,
  getUserById,
  delUser,
};