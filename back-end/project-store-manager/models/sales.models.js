const conexaoMysql = require('./connection');

const infoVenda = (venda) => ({
saleId: venda.sale_id,
date: venda.date,
productId: venda.product_id,
quantity: venda.quantity,
});

const adicionaVenda = async (itemsSold) => {
  const [saleId] = await conexaoMysql.execute(
    'INSERT INTO StoreManager.sales(date) VALUE (NOW())',
  );
  itemsSold.forEach(async ({ productId, quantity }) => {
    await conexaoMysql.execute(
      'INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleId.insertId, productId, quantity],
    );
  });
  return {
    id: saleId.insertId,
    itemsSold,
  };
};

const todasVendas = async () => {
   const retorno = `SELECT StoreManager.sales_products.*, StoreManager.sales.date
    FROM StoreManager.sales_products LEFT JOIN StoreManager.sales
    ON StoreManager.sales_products.sale_id = StoreManager.sales.id;`;
  const [vendas] = await conexaoMysql.execute(retorno);
  return vendas.map(infoVenda);
};

const vendaId = async (id) => {
  const [vID] = await conexaoMysql.execute(
    `SELECT StoreManager.sales_products.product_id, StoreManager.sales_products.quantity
    , StoreManager.sales.date
    FROM StoreManager.sales_products LEFT JOIN StoreManager.sales
    ON StoreManager.sales_products.sale_id = StoreManager.sales.id WHERE sale_id = ${id}`,
  );
  return vID.map(infoVenda);
};

const deletaVenda = async (id) => {
  await conexaoMysql.execute(
   'DELETE FROM StoreManager.sales_products WHERE sale_id = ?;', [id],
  );
};

const atualizaVenda = async (id, venda) => {
  await conexaoMysql.execute(`UPDATE StoreManager.sales_products
  SET product_id = ?, quantity = ?
  WHERE sale_id = ? AND product_id = ?;
  `, [venda.productId, venda.quantity, id, venda.productId]);
};

module.exports = {
  adicionaVenda,
  todasVendas,
  vendaId,
  deletaVenda,
  atualizaVenda,
};