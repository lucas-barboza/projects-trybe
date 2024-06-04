const { Category } = require('../models');

const createCategory = async (name) => {
  const result = await Category.create({ name });
  return result;
};

const getAll = async () => {
  const result = await Category.findAll({ attributes: ['id', 'name'] });
  return result;
};

module.exports = {
  createCategory,
  getAll,
};