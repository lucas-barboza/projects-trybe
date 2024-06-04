const { productsModels } = require('../models');

const recebeProdutos = async () => productsModels.recebeProdutos();

const recebeIdProdutos = async (id) => productsModels.recebeIdProdutos(id);

const adicionaProduto = async (name) => productsModels.adicionaProduto(name);

const atualizaProduto = async (id, name) => productsModels.atualizaProduto(id, name);

const deletaProduto = async (id) => productsModels.deletaProduto(id);

const pesquisaProduto = async (name) => productsModels.pesquisaProduto(name);

module.exports = {
  recebeProdutos,
  recebeIdProdutos,
  adicionaProduto,
  atualizaProduto,
  deletaProduto,
  pesquisaProduto,
};