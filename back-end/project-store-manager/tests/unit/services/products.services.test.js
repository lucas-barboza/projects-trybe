const sinon = require('sinon');
const { expect } = require('chai');

const produtosModels = require('../../../models/products.models');
const produtosServices = require('../../../services/products.services');

describe('Testes da camada SERVICES', () => {
  describe('recebeProdutos', () => {
    const produtos = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ];

    before(async () => {
      sinon.stub(produtosModels, 'recebeProdutos').resolves(produtos);
    });
    /*after(async () => {
      produtosModels.recebeProdutos.restore();
    });*/

    it('Verifica a tabela com produtos', async () => {
      const retorno = await produtosServices.recebeProdutos();

      expect(retorno).to.be.eql([
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ])
    });
  });
  describe('Verifica se existe o item com o ID recebido.', () => {
    const produtoID = [{ id: 3, name: 'Escudo do Capitão América' }];
    const produtoInvalido = null;

    it('Testa se o produto correto é retornado', async () => {
      sinon.stub(produtosModels, 'recebeIdProdutos').resolves(produtoID);
      const retorno = await produtosServices.recebeIdProdutos();
      expect(retorno).to.be.eql([{ id: 3, name: 'Escudo do Capitão América' }])
      produtosModels.recebeIdProdutos.restore();
    });
    it('Testa se retorna nulo quando passado uma id inválida', async () => {
      sinon.stub(produtosModels, 'recebeIdProdutos').resolves(produtoInvalido);
      const retorno = await produtosServices.recebeIdProdutos(404);
      expect(retorno).to.be.null;
      produtosModels.recebeIdProdutos.restore();
    });
  });
  describe('Testa a atualizaProduto', () => {
    it('verifica se a função atualiza informações e retorna um objeto com as novas informações', async () => {
      const expectResponse = { name: '', id: '' };
      sinon.stub(produtosModels, 'atualizaProduto').resolves(expectResponse);

      const id = 1;
      const name = 'product';

      const response = await produtosServices.atualizaProduto(name, id);

      expect(response).to.be.a('object');
      //expect(response).to.have.keys('id', 'name');
    })
  });
  describe('Testa a atualizaProduto', () => {
    const resposta = [{ "id": 1, "name": "Martelo de Thor" }];

    before(async () => {
      sinon.stub(produtosModels, 'pesquisaProduto').resolves(resposta);
    });
    after(async () => {
      produtosModels.pesquisaProduto.restore();
    });
    it('Testa se retorna o resultado esperado', async () => {
      const retorno = await produtosServices.pesquisaProduto({ q: 'Martelo' });
      expect(retorno).to.be.eql([{ "id": 1, "name": "Martelo de Thor" }]);
    });
  });
});