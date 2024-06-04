const connection = require('./connection');

const recebeProdutos = async () => {
  const [produtosRecebe] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );
  return produtosRecebe;
};

const recebeIdProdutos = async (id) => {
  const retorno = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [produtosID] = await connection.execute(retorno, [id]);
  if (produtosID.length === 0) {
    return null;
  }
  return produtosID[0];
};

const adicionaProduto = async (name) => {
  await connection.execute(
    'INSERT INTO StoreManager.products(name) VALUE (?);', [name],
  );
  const retorno = 'SELECT * FROM StoreManager.products ORDER BY id DESC LIMIT 1;';
  const [produtoAdd] = await connection.execute(retorno);
  return produtoAdd[0];
};

const atualizaProduto = async (id, name) => {
  await connection.execute(
    `UPDATE StoreManager.products  
    SET name=?
    WHERE id=?`,
    [name, id],
  );
  return { id, name };
};

const deletaProduto = async (id) => {
  connection.execute(
    `DELETE FROM StoreManager.products
    WHERE id = ?;`,
    [id],
  );
};

const pesquisaProduto = async (produto) => {
  const [retorno] = await connection.execute(`SELECT * FROM StoreManager.products 
  WHERE name LIKE ?;`, [`%${produto}%`]);
  return retorno;
};

module.exports = {
  recebeProdutos,
  recebeIdProdutos,
  adicionaProduto,
  atualizaProduto,
  deletaProduto,
  pesquisaProduto,
};