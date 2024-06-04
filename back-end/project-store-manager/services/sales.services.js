const { salesModels } = require('../models');

const adicionaVenda = async (produto) => salesModels.adicionaVenda(produto);

const todasVendas = async () => {
  const vendas = await salesModels.todasVendas();
  return vendas;
};

const vendaId = async (id) => salesModels.vendaId(id);

const deletaVenda = async (id) => salesModels.deletaVenda(id);

const atualizaVenda = async (id, venda) => salesModels.atualizaVenda(id, venda);

module.exports = {
  adicionaVenda,
  todasVendas,
  vendaId,
  deletaVenda,
  atualizaVenda,
};