const { postService } = require('../services');
const { Category, User, BlogPost } = require('../models');

const postCreate = async (req, res) => {
  const result = await postService.postCreate(req.body, res.locals.user);

  return res.status(201).json(result);
};

const fieldValidation = (req, res, next) => {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    return next();
};

const idValidation = async (req, res, next) => {
    const { categoryIds } = req.body;

    const { count } = await Category.findAndCountAll({ where: { id: categoryIds } });

    if (!count) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }

    return next();
};

const allPost = async (req, res) => {
  const result = await postService.allPost();

  return res.status(200).json(result);
};

const idPost = async (req, res) => {
  const { id } = req.params;

  const [result] = await postService.idPost(id);

  if (!result) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(result);
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  await postService.deletePost(Number(id));

  return res.status(204).end();
};

const editPost = async (req, res) => {
  const { id } = req.params;

  await postService.editPost(req.body, Number(id));

  const [result] = await postService.idPost(Number(id));

  return res.status(200).json(result);
};

const userValidation = async (req, res, next) => {
  const { id } = req.params;
  const { data } = res.locals.user;
  const { email } = data;

  const [user] = await User.findAll({ where: { email } });

  const [post] = await BlogPost.findAll({ where: { id } });

  if (post.userId !== user.id) {
      return res.status(401).json({ message: 'Unauthorized user' });
  }

  return next();
};

const postValidation = async (req, res, next) => {
  const { id } = req.params;

  const [post] = await BlogPost.findAll({ where: { id } });

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return next();
};

const postSearch = async (req, res) => {
  const { q } = req.query;

  const posts = await postService.searchPost(q);

  res.status(200).json(posts);
};

module.exports = {
  postCreate,
  fieldValidation,
  idValidation,
  allPost,
  idPost,
  deletePost,
  editPost,
  userValidation,
  postValidation,
  postSearch,
};