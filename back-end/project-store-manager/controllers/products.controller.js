const { productsService } = require('../services');

const recebeProdutos = async (req, res) => {
  const produtosRecebe = await productsService.recebeProdutos();
  return res.status(200).json(produtosRecebe);
};

const recebeIdProdutos = async (req, res) => {
  const { id } = req.params;
  const produtosID = await productsService.recebeIdProdutos(id);
  if (!produtosID) {
    return res.status(404).json({ message: 'Product not found' }).end();
  }
  return res.status(200).json(produtosID);
};

const adicionaProduto = async (req, res) => {
  const { name } = req.body;
  const produtoAdd = await productsService.adicionaProduto(name);
  return res.status(201).json(produtoAdd);
};

const atualizaProduto = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const produto = await productsService.recebeIdProdutos(id);
  if (!produto) return res.status(404).json({ message: 'Product not found' }).end();
  const attProduto = await productsService.atualizaProduto(id, name);
  return res.status(200).json(attProduto);
};

const deletaProduto = async (req, res) => {
  const { id } = req.params;
  const produto = await productsService.recebeIdProdutos(id);
  if (!produto) return res.status(404).json({ message: 'Product not found' }).end();
  await productsService.deletaProduto(id);
  return res.status(204).end();
};

const pesquisaProduto = async (req, res) => {
  const { q } = req.query;
  if (!q.length) return res.status(200).json(await productsService.recebeProdutos());
  const retorno = await productsService.pesquisaProduto(q);
  return res.status(200).json(retorno);
};

module.exports = {
  recebeProdutos,
  recebeIdProdutos,
  adicionaProduto,
  atualizaProduto,
  deletaProduto,
  pesquisaProduto,
};