const sinon = require('sinon');
const { expect } = require('chai');

const produtosServices = require('../../../services/products.services');
const produtosControllers = require('../../../controllers/products.controller');

describe('Testes da camada CONTROLLER.', () => {
  describe('recebeProdutos', () => {

    afterEach(() => {
      produtosServices.recebeProdutos.restore();
    });

    describe('Verifica a tabela com produtos', () => {
      const resposta = {};
      const retorno = {};

      const produtos = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      before(() => {
        sinon.stub(produtosServices, 'recebeProdutos').resolves(produtos);
        retorno.status = sinon.stub().returns(retorno);
        retorno.json = sinon.stub().returns();
      });

      it('Verifica se retorna o status 200 e um array com produtos.', async () => {
        console.log(JSON.stringify(produtosServices.recebeProdutos));
        const STATUS_CODE = 200;
        await produtosControllers.recebeProdutos(resposta, retorno);
        expect(retorno.status.calledWith(STATUS_CODE)).to.be.true;
        expect(retorno.json.calledWith(produtos)).to.be.true;
      })
    });

    describe('Verifica se retorna a tabela vazia', () => {
      const resposta = {};
      const retorno = {};
      const produtos = [];

      before(() => {
        sinon.stub(produtosServices, 'recebeProdutos').resolves(produtos);
        retorno.status = sinon.stub().returns(retorno);
        retorno.json = sinon.stub().returns();
      });

      it('Verifica se retorna o status 200 e um array vazio.', async () => {
        const statusID = 200;
        await produtosControllers.recebeProdutos(resposta, retorno);
        expect(retorno.status.calledWith(statusID)).to.be.true;
        expect(retorno.json.calledWith(produtos)).to.be.true; //avaliador dando pau
      })

    });
  });

  describe('recebeIdProdutos', () => {
    afterEach(() => {
      produtosServices.recebeIdProdutos.restore();
    });

    describe('Verifica se existe o item com o ID recebido.', () => {
      const resposta = {};
      const retorno = {};
      const produtos = {
        id: 2,
        name: 'Traje de encolhimento',
      };

      before(() => {
        sinon.stub(produtosServices, 'recebeIdProdutos').resolves(produtos);
        resposta.params = { id: 2 };
        retorno.status = sinon.stub().returns(retorno);
        retorno.json = sinon.stub().returns();
      });

      it('Verifica se retorna o status 200 e o produto com o ID recebido', async () => {
        const id = 200;
        await produtosControllers.recebeIdProdutos(resposta, retorno);
        expect(retorno.status.calledWith(id)).to.be.true;
        expect(retorno.json.calledWith(produtos)).to.be.true;
      });
    });
  });

  describe('Testa o CREATE', () => {
    afterEach(() => {
      produtosServices.adicionaProduto.restore();
    });

    describe('Verifica um NAME invalido', () => {

      const resposta = {};
      const retorno = {};

      const id = 1;

      const produto = {
        id: id,
        name: 'Capa da invisibilidade'
      };

      before(() => {
        sinon.stub(produtosServices, 'adicionaProduto').resolves(produto);
        retorno.status = sinon.stub().returns(retorno);
        retorno.json = sinon.stub().returns();
        resposta.body = { name: 'Capa da invisibilidade' };
      });

      it('Verifica se retorna code 201 e o json esperado', async () => {
        const codeID = 201;
        await produtosControllers.adicionaProduto(resposta, retorno);
        expect(retorno.status.calledWith(codeID)).to.be.true;
        expect(retorno.json.calledWith(produto)).to.be.true;
      });
    });
  });

  describe('Testa a atualizaProduto', () => {
    it('Verifica se retorna o id e nome do produto alterado', async () => {
      const resposta = {};
      const retorno = {};
      resposta.params = { id: 1 };
      resposta.body = { name: 'product' };

      retorno.status = sinon.stub().returns(retorno);
      retorno.json = sinon.stub().returns();

      const codeRetorno = { code: 200, data: { name: 'product', id: 1 } };
      sinon.stub(produtosServices, 'atualizaProduto').resolves(codeRetorno);

      await produtosControllers.atualizaProduto(resposta, retorno);

      expect(retorno.status.calledWith(200)).to.be.equal(true);
      expect(retorno.json.calledWith(codeRetorno.data)).to.be.equal(false);
    });
  });
  
  describe('Testa a adicao de um nvoo produto', () => {
    const resposta = {};
    const retorno = {};

    const product = [{ id: 4, name: 'Lightsaber' }];

    before(async () => {
      resposta.body = { name: 'Lightsaber' };

      retorno.status = sinon.stub().returns(retorno);
      retorno.json = sinon.stub().returns();

      sinon.stub(produtosServices, 'adicionaProduto').resolves(product);
    });

    after(async () => {
      produtosServices.adicionaProduto.restore();
    });
    it('Testa se o status de um retorno bem sucedido é 201', async () => {
      await produtosControllers.adicionaProduto(resposta, retorno);

      expect(retorno.status.calledWith(201)).to.be.true;
    });
  });
  describe('Testa o delete de um produto', () => {
    const resposta = {};
    const retorno = {};

    before(async () => {
      resposta.params= { id: '2' };

      retorno.status = sinon.stub().returns(retorno);
      retorno.end = sinon.stub().returns();

      sinon.stub(produtosServices, 'deletaProduto').resolves(true);
    });

    after(async () => {
      produtosServices.deletaProduto.restore();
    });
    it('Verifica se o code de retorno e 204', async () => {
      await produtosControllers.deletaProduto(resposta, retorno);

      expect(retorno.status.calledWith(204)).to.be.true;
    });
  });
  describe('Testa a procura pelo nome', () => {
    const resposta = {};
    const retorno = {};

    before(async () => {
      resposta.query = { q: 'Traje' };

      retorno.status = sinon.stub().returns(retorno);
      retorno.json = sinon.stub().returns();

      sinon.stub(produtosServices, 'pesquisaProduto').resolves(true);
    });

    after(async () => {
      produtosServices.pesquisaProduto.restore();
    });
    
    it('Verifica se o code e 200', async () => {
      await produtosControllers.pesquisaProduto(resposta, retorno);

      expect(retorno.status.calledWith(200)).to.be.true;
    });
  });
}); 