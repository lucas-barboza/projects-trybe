const { productsService } = require('../services');

const validacaoProdutoID = (req, res, prox) => {
  let codigoID;
  const produtoVendido = req.body;
  produtoVendido.forEach((item) => {
    if (!item.productId) codigoID = 400;
  });
    switch (codigoID) {
    case 400:
      return res.status(codigoID).json({ message: '"productId" is required' });
    default:
      break;
  }
  prox();
};

const validacaoProdutoExiste = async (req, res, prox) => {
  let codigoID;
  const produtos = [];
  const vendido = req.body;
  await Promise.all(vendido.map(async ({ productId }) => {
    produtos.push(await productsService.recebeIdProdutos(productId));
  }));

  if (produtos.includes(null)) codigoID = 404;
  switch (codigoID) {
    case 404:
      return res.status(codigoID).json({ message: 'Product not found' });
    default:
      break;
  }
  prox();
};

const validacaoProdutoQuantidade = (req, res, prox) => {
  const vendido = req.body;
  let codigoID;
  vendido.forEach((itemVendido) => {
    if (itemVendido.quantity === undefined) codigoID = 400;
    else if (itemVendido.quantity < 1) codigoID = 422;
  });
  switch (codigoID) {
    case 400:
      return res.status(400).json({ message: '"quantity" is required' });
    case 422:
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    default:
      break;
  }
  prox();
};

module.exports = {
  validacaoProdutoID,
  validacaoProdutoExiste,
  validacaoProdutoQuantidade,
};