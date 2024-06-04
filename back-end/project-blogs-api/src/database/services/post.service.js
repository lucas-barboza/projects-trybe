const { User, BlogPost, Category, PostCategory, Sequelize } = require('../models');

const postCreate = async ({ title, content, categoryIds }, data) => {
  const { email } = data.data;

  const [user] = await User.findAll({ where: { email } });

  const userId = user.dataValues.id;

  const create = await BlogPost.create({ title, content, userId });

  await categoryIds.forEach((categoryId) => PostCategory.create({ postId: create.id, categoryId }));

  return create;
};

const allPost = async () => {
  const getAll = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return getAll;
};

const idPost = async (id) => {
  const getAll = await BlogPost.findAll({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return getAll;
};

const deletePost = async (id) => {
  const destroyPost = await BlogPost.destroy({ where: { id } });

  return destroyPost;
};

const editPost = async ({ title, content }, id) => {
  const updatePost = await BlogPost.update({ title, content }, { where: { id } });

  return updatePost;
};

const searchPost = async (q) => {
  const { Op } = Sequelize;
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

module.exports = {
  postCreate,
  allPost,
  idPost,
  deletePost,
  editPost,
  searchPost,
};