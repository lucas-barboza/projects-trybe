const { salesService } = require('../services');

const adicionaVenda = async (req, res) => {
  const produtoVendido = req.body;
  const oferta = await salesService.adicionaVenda(produtoVendido);
  return res.status(201).json(oferta);
};

const todasVendas = async (req, res) => {
  const ofertas = await salesService.todasVendas();
  return res.status(200).json(ofertas);
};

const vendaId = async (req, res) => {
  const { id } = req.params;
  const vID = await salesService.vendaId(id);
  if (!vID || !vID.length) return res.status(404).json({ message: 'Sale not found' }); // Verifica se vID é null ou undefined
  return res.status(200).json(vID);
};

const deletaVenda = async (req, res) => {
  const { id } = req.params;
  const vID = await salesService.vendaId(id);
  if (!vID.length) return res.status(404).json({ message: 'Sale not found' }).end();
  await salesService.deletaVenda(id);
  return res.status(204).end();
};

const atualizaVenda = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const itemsUpdated = [];
  const vID = await salesService.vendaId(id);
  if (!vID.length) return res.status(404).json({ message: 'Sale not found' }).end();
  body.forEach((venda) => {
    salesService.atualizaVenda(id, venda);
    itemsUpdated.push({ productId: venda.productId, quantity: venda.quantity });
  });
  const vendaAtualizada = { saleId: id, itemsUpdated };
  return res.status(200).json(vendaAtualizada);
};

module.exports = {
  adicionaVenda,
  todasVendas,
  vendaId,
  deletaVenda,
  atualizaVenda,
};