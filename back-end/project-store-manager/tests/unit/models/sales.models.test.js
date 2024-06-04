const sinon = require('sinon');
const { expect } = require('chai');

const conexaoMysql = require('../../../models/connection');
const vendasModels = require('../../../models/sales.models');

describe('Testa a camada MODELS', () => {
  describe('Verifica uma nova venda', () => {
    const execute = [{ insertId: 3 }];

    before(async () => {
      sinon.stub(conexaoMysql, 'execute').resolves(execute);
    });
    after(async () => {
      conexaoMysql.execute.restore();
    });
    it('Testa se retorna um objeto', async () => {
      const resposta = await vendasModels.adicionaVenda([
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]);
      expect(resposta).to.be.a('object');
    });
    it('Verifica se o objeto retornado é o correto', async () => {
      const resposta = await vendasModels.adicionaVenda([
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ])
      expect(resposta).to.be.eql(
        {
          "id": 3,
          "itemsSold": [
            {
              "productId": 1,
              "quantity": 1
            },
            {
              "productId": 2,
              "quantity": 5
            }
          ]
        }
      );
    });
  });
  describe('Testa a requisicao das vendas', () => {
    const vendas = [[
      {
        "saleId": 1,
        "date": "2022-08-29T01:40:46.000Z",
        "productId": 1,
        "quantity": 5
      },
      {
        "saleId": 1,
        "date": "2022-08-29T01:40:46.000Z",
        "productId": 2,
        "quantity": 10
      },
      {
        "saleId": 2,
        "date": "2022-08-29T01:40:46.000Z",
        "productId": 3,
        "quantity": 15
      }
    ]];

    before(async () => {
      sinon.stub(conexaoMysql, 'execute').resolves(vendas);
    });

    after(async () => {
      conexaoMysql.execute.restore();
    });

    it('Verifica se retorna um array', async () => {
      const retorno = await vendasModels.todasVendas();

      expect(retorno).to.be.an('array');
    });
    it('Verifica se os dados estao corretos', async () => {
      const retorno = await vendasModels.todasVendas();

      expect(retorno[0]).to.have.a.property('saleId');
      expect(retorno[0]).to.have.a.property('date');
      expect(retorno[0]).to.have.a.property('productId');
      expect(retorno[0]).to.have.a.property('quantity');
    });
  });
}); 