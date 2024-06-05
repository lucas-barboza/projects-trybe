import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizaMatches from '../database/models/matches.model';
import SequelizaTeams from '../database/models/teams.model';
import { homeTeamsPerformace, awayTeamsPerformace } from './mocks/leaderBoards.mock';
import { corSan } from './mocks/teams.mock'
import { sanMatchesHome, corMatchesHome, sanMatchesAway, corMatchesAway } from './mocks/matches.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica endpoint /leaderboard/home', () => {
  it('Verifica se corretamente o desempenho dos times em casa', async function() {
    const teamsBuild = SequelizaTeams.bulkBuild(corSan);
    const corBuild = SequelizaMatches.bulkBuild(corMatchesHome);
    const sanBuild = SequelizaMatches.bulkBuild(sanMatchesHome);
    const stub = sinon.stub(SequelizaMatches, 'findAll');
    stub.onFirstCall().resolves(corBuild);
    stub.onSecondCall().resolves(sanBuild);
    sinon.stub(SequelizaTeams, 'findAll').resolves(teamsBuild);
    const { status, body } = await chai.request(app).get('/leaderboard/home').send();

    // console.log(status);
    // console.log(body);
    expect(status).to.equal(200);
    expect(body).to.deep.equal(homeTeamsPerformace);
  });

  afterEach(sinon.restore);
});

describe('Verifica endpoint /leaderboard/away', () => {
  it('Verifica se corretamente o desempenho dos times em casa', async function() {
    const teamsBuild = SequelizaTeams.bulkBuild(corSan);
    const corBuild = SequelizaMatches.bulkBuild(corMatchesAway);
    const sanBuild = SequelizaMatches.bulkBuild(sanMatchesAway);
    const stub = sinon.stub(SequelizaMatches, 'findAll');
    stub.onFirstCall().resolves(corBuild);
    stub.onSecondCall().resolves(sanBuild);
    sinon.stub(SequelizaTeams, 'findAll').resolves(teamsBuild);
    const { status, body } = await chai.request(app).get('/leaderboard/away').send();

    // console.log(status);
    // console.log(body);
    expect(status).to.equal(200);
    expect(body).to.deep.equal(awayTeamsPerformace);
  });

  afterEach(sinon.restore);
});

// describe('Verifica endpoint /leaderboard', () => {
//   it('Verifica se corretamente o desempenho dos times em casa', async function() {
//     const teamsBuild = SequelizaTeams.bulkBuild(corSan);
//     const corBuild = SequelizaMatches.bulkBuild(corMatchesAway);
//     const sanBuild = SequelizaMatches.bulkBuild(sanMatchesAway);
//     const stub = sinon.stub(SequelizaMatches, 'findAll');
//     stub.onFirstCall().resolves(corBuild);
//     stub.onSecondCall().resolves(sanBuild);
//     sinon.stub(SequelizaTeams, 'findAll').resolves(teamsBuild);
//     const { status, body } = await chai.request(app).get('/leaderboard').send();

//     // console.log(status);
//     // console.log(body);
//     expect(status).to.equal(200);
//     expect(body).to.deep.equal(awayTeamsPerformace);
//   });

//   afterEach(sinon.restore);
// });