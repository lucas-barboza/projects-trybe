const express = require('express');
const { productsController } = require('../controllers');
const { productsValidation } = require('../middlewares');

const router = express.Router();

router.get('/search', productsController.pesquisaProduto);
router.get('/', productsController.recebeProdutos);
router.get('/:id', productsController.recebeIdProdutos);
router.post('/', productsValidation.validacao, productsController.adicionaProduto);
router.put('/:id', productsValidation.validacao, productsController.atualizaProduto);
router.delete('/:id', productsController.deletaProduto);

module.exports = router;