import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizaMatches from '../database/models/matches.model';
import { matches, matchesInProgress, matchesNotInProgress, matchFinished, returnUpdatedMatchInProgress, createdMatch, bodyForCreateMatch, invalidBodyForCreateMatch, invalidTeamIdForCreateMatch } from './mocks/matches.mock';

import { Response } from 'superagent';
import jwtUtils from '../utils/jwt.utils';
import { token } from './mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica endpoint /matches', () => {
  it('Verifica se retorna todas as partidas', async function() {
    sinon.stub(SequelizaMatches, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('Verifica se retorna todas as partidas em progresso', async function() {
    sinon.stub(SequelizaMatches, 'findAll').resolves(matchesInProgress as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesInProgress);
  });

  it('Verifica se retorna todas as partidas finalizadas', async function() {
    sinon.stub(SequelizaMatches, 'findAll').resolves(matchesNotInProgress as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesNotInProgress);
  });

  afterEach(sinon.restore);
});

describe('Verifica endpoint /matches/:id/finish', () => {

  it('Verifica se finaliza partida em andamento', async function() {
    sinon.stub(SequelizaMatches, 'update').resolves(matchFinished as any);

    const { status, body } = await chai.request(app).patch('/matches/42/finish')
      .set(token);
    sinon.stub(jwtUtils, 'validateToken').resolves(true);
    
    expect(status).to.equal(200);
    expect(body.message).to.equal('Finished');
  });

  it('Verifica se finaliza erro com id inexistente', async function() {
    sinon.stub(SequelizaMatches, 'update').resolves(undefined);

    const { status, body } = await chai.request(app).patch('/matches/9999999/finish')
      .set(token);
    sinon.stub(jwtUtils, 'validateToken').resolves(true);
    
    expect(status).to.equal(404);
    expect(body.message).to.equal('Not found match');
  });

  

  afterEach(sinon.restore);
});

describe('Verifica endpoint /matches/:id', () => {

  it('Verifica se atualiza uma partida em andamento', async function() {
    sinon.stub(SequelizaMatches, 'update').resolves(returnUpdatedMatchInProgress as any);

    const { status, body } = await chai.request(app).patch('/matches/41')
      .set(token).send(returnUpdatedMatchInProgress);
    sinon.stub(jwtUtils, 'validateToken').resolves(true);
    
    expect(status).to.equal(200);
    expect(body).to.deep.equal(returnUpdatedMatchInProgress);
  });

  it('Verifica se finaliza erro com id inexistente', async function() {
    sinon.stub(SequelizaMatches, 'update').resolves(undefined);

    const { status, body } = await chai.request(app).patch('/matches/9999999')
      .set(token);
    sinon.stub(jwtUtils, 'validateToken').resolves(true);
    
    expect(status).to.equal(404);
    expect(body.message).to.equal('Not found match');
  });
  afterEach(sinon.restore);
});

describe('Verifica endpoint /matches', () => {

  it('Verifica se cria uma partida em andamento', async function() {
    sinon.stub(SequelizaMatches, 'create').resolves(createdMatch as any);

    const { status, body } = await chai.request(app).post('/matches')
      .set(token).send(bodyForCreateMatch);
    sinon.stub(jwtUtils, 'validateToken').resolves(true);
    
    expect(status).to.equal(201);
    expect(body).to.deep.equal(createdMatch);
  });

  it('Verifica se que não é possivel criar uma partida com dois times iguais', async function() {
    sinon.stub(SequelizaMatches, 'update').resolves();

    const { status, body } = await chai.request(app).post('/matches')
      .set(token).send(invalidBodyForCreateMatch);;
    sinon.stub(jwtUtils, 'validateToken').resolves(true);

    expect(status).to.equal(422);
    expect(body.message).to.equal('It is not possible to create a match with two equal teams');
  });

  it('Verifica se que não é possivel criar uma partida com time inexistente', async function() {
    sinon.stub(SequelizaMatches, 'update').resolves();

    const { status, body } = await chai.request(app).post('/matches')
      .set(token).send(invalidTeamIdForCreateMatch);;
    sinon.stub(jwtUtils, 'validateToken').resolves(true);
    
    expect(status).to.equal(404);
    expect(body.message).to.equal('There is no team with such id!');
  });
  afterEach(sinon.restore);
});

