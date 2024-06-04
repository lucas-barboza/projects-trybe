const express = require('express');
const { categoriesController } = require('../controllers');
const { tokenValidation } = require('../middlewares');

const router = express.Router();

router.post('/',
  tokenValidation.tokenValidate,
  categoriesController.nameValidation,
  categoriesController.createCategory);
router.get('/', tokenValidation.tokenValidate, categoriesController.getAll);

module.exports = router;