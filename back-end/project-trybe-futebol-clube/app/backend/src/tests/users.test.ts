import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUsers from '../database/models/users.model';
import { userNoExist, userNoEmail, userNoPassword, user, validSequelizeUser, invalidEmail, invalidPassword, role, token, empytToken, invalidToken } from './mocks/users.mock';

import loginValidation from '../middlewares/login.validation';

import { Response } from 'superagent';
import jwtUtils, { Token } from '../utils/jwt.utils';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica endpoint /login', () => {
  it('Verifica se retorna null com usuario inexistente', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login')
      .send(userNoExist);

    expect(status).to.equal(401);
    expect(body.message).to.equal('Invalid email or password');
  });

  it('Verifica se retorna corretamente quando nao passa o email', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login')
      .send(userNoEmail);

    expect(status).to.equal(400);
    expect(body.message).to.equal('All fields must be filled');
  });

  it('Verifica se retorna corretamente quando nao passa o email', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login')
      .send(userNoPassword);

    expect(status).to.equal(400);
    expect(body.message).to.equal('All fields must be filled');
  });

  it('Verifica se retorna corretamente quando passa email e senhas corretos', async function() {
    const bodyParam = user;
    const loginUser = SequelizeUsers.build(validSequelizeUser);

    sinon.stub(SequelizeUsers, 'findOne').resolves(loginUser);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const { status, body } = await chai.request(app).post('/login')
      .send(bodyParam);

    expect(status).to.equal(200);
    expect(body).to.haveOwnProperty('token');
  });
  
  it('Verifica se retorna corretamente quando passa email digita incorretamente', async function() {

    sinon.stub(SequelizeUsers, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login')
      .send(invalidEmail);

    expect(status).to.equal(401);
    expect(body.message).to.equal('Invalid email or password');
  });

  it('Verifica se retorna corretamente quando passa a senha menor que 6 digitos', async function() {

    sinon.stub(SequelizeUsers, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login')
      .send(invalidPassword);

    expect(status).to.equal(401);
    expect(body.message).to.equal('Invalid email or password');
  });

  it('Verifica se retorna erro com token vazio', async function() {

    sinon.stub(loginValidation, 'validateToken').resolves(null);

    const { status, body } = await chai.request(app).get('/login/role')
      .send(empytToken);
    expect(status).to.equal(401);
    expect(body.message).to.equal('Token not found');
  });

  it('Verifica se retorna erro com token invalido', async function() {

    sinon.stub(loginValidation, 'validateToken').resolves(null);

    const { status, body } = await chai.request(app).get('/login/role')
      .set(invalidToken);
    expect(status).to.equal(401);
    expect(body.message).to.equal('Token must be a valid token');
  });

  it('Verifica se retorna a role do usuario com sucesso', async function() {

    const validUser = SequelizeUsers.build(validSequelizeUser);

    sinon.stub(SequelizeUsers, 'findOne').resolves(validUser);
    sinon.stub(jwtUtils, 'validateToken').resolves(true);

    const { status, body } = await chai.request(app).get('/login/role')
      .set(token);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ "role": validSequelizeUser.role });
  });

  it('Verifica se retorna erro com token valido e usuario invalido', async function() {

    sinon.stub(SequelizeUsers, 'findOne').resolves(null);
    sinon.stub(jwtUtils, 'validateToken').resolves(true);

    const { status, body } = await chai.request(app).get('/login/role')
      .set(token);

    expect(status).to.equal(401);
    expect(body.message).to.deep.equal('Invalid email or password');
  });

  afterEach(sinon.restore);
});

describe('Verifica endpoint /login/role', () => {
  it('Verifica se retorna erro com token vazio', async function() {

    sinon.stub(loginValidation, 'validateToken').resolves(null);

    const { status, body } = await chai.request(app).get('/login/role')
      .send(empytToken);
    expect(status).to.equal(401);
    expect(body.message).to.equal('Token not found');
  });

  it('Verifica se retorna erro com token invalido', async function() {

    sinon.stub(loginValidation, 'validateToken').resolves(null);

    const { status, body } = await chai.request(app).get('/login/role')
      .set(invalidToken);
    expect(status).to.equal(401);
    expect(body.message).to.equal('Token must be a valid token');
  });

  it('Verifica se retorna a role do usuario com sucesso', async function() {

    const validUser = SequelizeUsers.build(validSequelizeUser);

    sinon.stub(SequelizeUsers, 'findOne').resolves(validUser);
    sinon.stub(jwtUtils, 'validateToken').resolves(true);

    const { status, body } = await chai.request(app).get('/login/role')
      .set(token);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ "role": validSequelizeUser.role });
  });

  it('Verifica se retorna erro com token valido e usuario invalido', async function() {

    sinon.stub(SequelizeUsers, 'findOne').resolves(null);
    sinon.stub(jwtUtils, 'validateToken').resolves(true);

    const { status, body } = await chai.request(app).get('/login/role')
      .set(token);

    expect(status).to.equal(401);
    expect(body.message).to.deep.equal('Invalid email or password');
  });

  afterEach(sinon.restore);
});

