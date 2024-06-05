import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizaTeams from '../database/models/teams.model';
import { team, teams } from './mocks/teams.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica endpoint /teams', () => {
  it('Verifica se retorna todos os times', async function() {
    sinon.stub(SequelizaTeams, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('Verifica se encontra o time pelo id', async function () {
    sinon.stub(SequelizaTeams, 'findByPk').resolves(team as any);

    const { id, ...sendData } = team;

    const { status, body } = await chai.request(app).get('/teams/5')
      .send(sendData);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });

  it('Verifica se retorna null com time inexistente', async function () {
    sinon.stub(SequelizaTeams, 'findByPk').resolves(null);

    const { id, ...sendData } = team;

    const { status, body } = await chai.request(app).get('/teams/99')
      .send(sendData);

    expect(status).to.equal(404);
    expect(body.message).to.equal('Team 99 not found');
  });

  afterEach(sinon.restore);
});
