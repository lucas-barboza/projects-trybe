const express = require('express');
const { salesController } = require('../controllers');
const { salesValidation } = require('../middlewares');

const router = express.Router();

router.post(
  '/',
  salesValidation.validacaoProdutoQuantidade,
  salesValidation.validacaoProdutoID,
  salesValidation.validacaoProdutoExiste,
  salesController.adicionaVenda,
);
router.get('/', salesController.todasVendas);
router.get('/:id', salesController.vendaId);
router.delete('/:id', salesController.deletaVenda);
router.put('/:id',
  salesValidation.validacaoProdutoQuantidade,
  salesValidation.validacaoProdutoID,
  salesValidation.validacaoProdutoExiste,
  salesController.atualizaVenda);

module.exports = router;