const sinon = require('sinon');
const { expect } = require('chai');

const vendasServices = require('../../../services/sales.services');
const vendasController = require('../../../controllers/sales.controller');

describe('Testa da camada vendasController.', () => {
  describe('Testa o CREATE', () => {

    afterEach(() => {
      vendasServices.adicionaVenda.restore();
    });

    describe('Verifica se tem o retorno esperado quando recebe um array', () => {
      const resposta = {};
      const retorno = {};

      const produtos = [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ];

      const retornoEsperado = {
        id: 3,
        itemsSold: produtos,
      };

      before(() => {
        sinon.stub(vendasServices, 'adicionaVenda').resolves(retornoEsperado);
        resposta.body = produtos;
        retorno.status = sinon.stub().returns(retorno);
        retorno.json = sinon.stub().returns();
      });

      it('Verifica se retorna o code 201 e o json corretamente', async () => {
        const codeID = 201;
        await vendasController.adicionaVenda(resposta, retorno);
        expect(retorno.status.calledWith(codeID)).to.be.true;
        expect(retorno.json.calledWith(retornoEsperado)).to.be.true;
      })
    })
  });
  describe('Testa quando deleta uma venda', () => {
    const resposta = {};
    const retorno = {};

    before(() => {
      resposta.params = { id: 2 };

      retorno.status = sinon.stub().returns(retorno);
      retorno.end = sinon.stub().returns();

      sinon.stub(vendasServices, 'deletaVenda').resolves(true);
    });

    after(() => {
      vendasServices.deletaVenda.restore();
    });
    it('Verifica se o code de retorno e 204', async () => {
      await vendasController.deletaVenda(resposta, retorno);
      expect(retorno.status.calledWith(204)).to.be.equal(true);
    });
  });
  describe('Testa se retorna 404 para venda não encontrada', () => {
    const resposta = {};
    const retorno = {};

    before(() => {
      resposta.params = { id: 99 }; // ID fictício que não existe

      sinon.stub(vendasServices, 'vendaId').resolves(null);

      retorno.status = sinon.stub().returns(retorno);
      retorno.json = sinon.stub().returns();
    });

    after(() => {
      vendasServices.vendaId.restore();
    });

    it('Verifica se retorna 404 para venda não encontrada', async () => {
      const codeID = 404;
      await vendasController.vendaId(resposta, retorno);
      expect(retorno.status.calledWith(codeID)).to.be.true;
      expect(retorno.json.calledWith({ message: 'Sale not found' })).to.be.true;
    });
  });
  describe('Testa todas as vendas', () => {
    const resposta = {};
    const retorno = {};

    before(() => {
      sinon.stub(vendasServices, 'todasVendas').resolves([{ id: 1, items: [] }]);
      retorno.status = sinon.stub().returns(retorno);
      retorno.json = sinon.stub().returns();
    });

    after(() => {
      vendasServices.todasVendas.restore();
    });

    it('Verifica se retorna 200 e a lista de vendas', async () => {
      const codeID = 200;
      await vendasController.todasVendas(resposta, retorno);
      expect(retorno.status.calledWith(codeID)).to.be.true;
      expect(retorno.json.calledWith([{ id: 1, items: [] }])).to.be.true;
    });
  });

  describe('Testa a atualização de uma venda', () => {
    const resposta = {};
    const retorno = {};

    before(() => {
      resposta.params = { id: 1 };
      resposta.body = [{ productId: 1, quantity: 5 }];
      sinon.stub(vendasServices, 'vendaId').resolves([{ id: 1, items: [] }]);
      sinon.stub(vendasServices, 'atualizaVenda').resolves(true);
      retorno.status = sinon.stub().returns(retorno);
      retorno.json = sinon.stub().returns();
    });

    after(() => {
      vendasServices.vendaId.restore();
      vendasServices.atualizaVenda.restore();
    });

    it('Verifica se retorna 200 e a venda atualizada', async () => {
      const codeID = 200;
      await vendasController.atualizaVenda(resposta, retorno);
      expect(retorno.status.calledWith(codeID)).to.be.true;
      expect(retorno.json.called).to.be.true;
    });
  });
}); 