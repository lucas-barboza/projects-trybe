const sinon = require('sinon');
const { expect } = require('chai');

const vendasModels = require('../../../models/sales.models');
const vendasServices = require('../../../services/sales.services');

describe('Testa a camada SERVICES', () => {
  describe('Verifica uma nova venda', () => {
    const venda = {
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
    };

    before(async () => {
      sinon.stub(vendasModels, 'adicionaVenda').resolves(venda);
    });
    /*after(async () => {
      vendasModels.adicionaVenda.restore();
    });*/
    it('Verifica se retorna o objeito correto', async () => {
      const resposta = await vendasServices.adicionaVenda([
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
    it('Verifica se retorna o objeito correto', async () => {
      const resposta = await vendasServices.adicionaVenda([
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
    const vendas = [
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
    ];

    before(async () => {
      sinon.stub(vendasModels, 'todasVendas').resolves(vendas);
    });

    after(async () => {
      vendasModels.todasVendas.restore();
    });

    it('Verifica se retorna um array', async () => {
      const retorno = await vendasServices.todasVendas();

      expect(retorno).to.be.an('array');
    });
    it('Verifica se os dados estao corretos', async () => {
      const retorno = await vendasServices.todasVendas();

      expect(retorno[0]).to.be.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
}); 