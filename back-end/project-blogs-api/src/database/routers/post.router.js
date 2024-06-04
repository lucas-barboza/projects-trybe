const express = require('express');
const { postController } = require('../controllers');
const { tokenValidation } = require('../middlewares');

const router = express.Router();

router.get('/', tokenValidation.tokenValidate, postController.allPost);
router.get('/search', tokenValidation.tokenValidate, postController.postSearch);
router.get('/:id', tokenValidation.tokenValidate, postController.idPost);
router.post('/', tokenValidation.tokenValidate, postController.fieldValidation,
postController.idValidation, postController.postCreate);
router.put('/:id',
  tokenValidation.tokenValidate,
  postController.fieldValidation,
  postController.userValidation,
  postController.editPost);
router.delete('/:id', 
  tokenValidation.tokenValidate,
  postController.postValidation,
  postController.userValidation,
  postController.deletePost);

module.exports = router;