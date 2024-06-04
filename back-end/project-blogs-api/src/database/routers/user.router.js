const express = require('express');
const { loginController } = require('../controllers');
const { tokenValidation } = require('../middlewares');

const router = express.Router();

router.post('/',
  loginController.nameValidation,
  loginController.emailValidation, 
  loginController.passwordValidation,
  loginController.existingEmailValidation, 
  loginController.createUser);
router.get('/', tokenValidation.tokenValidate, loginController.allUsers);
router.get('/:id', tokenValidation.tokenValidate, loginController.getUserById);
router.delete('/me',
  tokenValidation.tokenValidate,
  loginController.delUser);

module.exports = router;