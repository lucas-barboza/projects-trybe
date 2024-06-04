const { categoriesService } = require('../services');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { id } = req.user;
  const category = await categoriesService.createCategory(name, id);
  res.status(201).json(category);
};

const nameValidation = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }
    const result = await categoriesService.createCategory(name);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAll = async (_req, res) => {
  const result = await categoriesService.getAll();

  return res.status(200).json(result);
};

module.exports = {
  createCategory,
  nameValidation,
  getAll,
};