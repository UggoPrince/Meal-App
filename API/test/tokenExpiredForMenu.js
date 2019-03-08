/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint linebreak-style: ["error", "windows"] */
/* global describe:true, it:true, before */
import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();
chai.use(chaiHttp);

describe('Menu test when token expires', () => {
  const menu = {
    mealId: [1, 2],
  };
  before(() => {
    process.env.tokenTime = -1;
  });
  it('should login the user', (done) => {
    chai.request(app)
      .post('/api/v1/customers/auth/login')
      .send({
        email: 'expugo@gmail.com',
        password: '12345678',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.be.an('object');
        process.env.tokenExpCUST = res.body.token;
        done();
      });
  });
  it('should tell the caterer that token has expired', (done) => {
    chai.request(app)
      .get('/api/v1/menu')
      .set({ Authorization: process.env.tokenExpCUST })
      .end((err, res) => {
        expect(res.status).to.be.eql(401);
        expect(res.type).to.be.equal('application/json');
        expect(res.body).to.be.an('array');
        done();
      });
  });
  it('should tell the caterer that token has expired', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set({ Authorization: process.env.tokenExpCAT })
      .send(menu)
      .end((err, res) => {
        expect(res.status).to.be.eql(401);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
