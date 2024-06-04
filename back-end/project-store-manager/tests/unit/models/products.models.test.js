const { expect } = require('chai');
const sinon = require('sinon');

const conexaoMysql = require('../../../models/connection');
const produtosModels = require('../../../models/products.models');

describe('Testes da camada MODELS.', () => {
  describe('getAll', () => {
    afterEach(() => {
      conexaoMysql.execute.restore();
    });

    describe('Verifica a tabela com produtos', () => {
      const produtos = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      before(() => {
        const retorno = [produtos];
        sinon.stub(conexaoMysql, 'execute').resolves(retorno);
      });

      it('Retorna arrays com itens.', async () => {
        const products = await produtosModels.recebeProdutos();
        expect(products).to.be.equal(produtos);
      });
    });

    describe('Verifica a tabela vazia', () => {
      const produtos = [];

      before(() => {
        const retorno = [produtos];
        sinon.stub(conexaoMysql, 'execute').resolves(retorno);
      });

      it('Retorna um array vazio.', async () => {
        const products = await produtosModels.recebeProdutos();
        expect(products).to.be.equal(produtos);
      });
    });
  });

  describe('recebeIdProdutos', () => {
    afterEach(() => {
      conexaoMysql.execute.restore();
    });

    describe('Verifica quando não existe o item do ID recebido', () => {
      before(() => {
        const retorno = [[]];
        sinon.stub(conexaoMysql, 'execute').resolves(retorno);
      });
      it('Verifica se retorna null.', async () => {
        const id = 100;
        const product = await produtosModels.recebeIdProdutos(id);
        expect(product).to.be.null;
      });
    });

    describe('Verifica se retorna o produto do ID recebido', () => {
      const produtos = {
        id: 2,
        name: 'Traje de encolhimento',
      };

      before(() => {
        const retorno = [[produtos]];
        sinon.stub(conexaoMysql, 'execute').resolves(retorno);
      });

      it('Verifica se retorna o produto', async () => {
        const id = 2;
        const product = await produtosModels.recebeIdProdutos(id);
        expect(product).to.be.equal(produtos);
      });
    });

    describe('Testa a atualizaProduto', () => {
      it('Verifica se retorna um objeto com name e id', async () => {
        sinon.stub(conexaoMysql, 'execute').resolves([]);

        const id = 1;
        const name = 'product';
        const response = await produtosModels.atualizaProduto(name, id);
        expect(response).to.be.an('object');
        expect(response).to.have.keys('name', 'id');
      });
    });

    describe('Testa a procura pelo nome', () => {
      const resposta = [{"id": 1, "name": "Martelo de Thor"}];

      before(async () => {
        sinon.stub(conexaoMysql, 'execute').resolves(resposta);
      });
      /*after(async () => {
        conexaoMysql.execute.restore();
      });*/
      it('Testa se retorna um objeto', async () => {
        const retorno = await produtosModels.pesquisaProduto({ q: 'Martelo' });
        expect(retorno).to.be.a('object');
      });
    });
    it('Verifica se um novo produto é adicionado corretamente', async () => {
      const novoProduto = {
        id: 4,
        name: 'Martelo Mjölnir',
      };

      const retornoMock = [[novoProduto]];
      sinon.stub(conexaoMysql, 'execute').resolves(retornoMock);

      const produtoAdicionado = await produtosModels.adicionaProduto('Martelo Mjölnir');
      expect(produtoAdicionado).to.deep.equal(novoProduto);
    });
  });
});

module.exports = produtosModels;
