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


describe('Meals test when token expires', () => {
  const meal = {
    name: 'rice and stew',
    size: 'plates',
    price: 400,
    currency: 'USD',
  };
  const mealUpdate1 = {
    name: 'Eba and Egusi',
    price: 450,
  };
  before(() => {
    process.env.tokenTime = -1;
  });
  it('should login the user', (done) => {
    chai.request(app)
      .post('/api/v1/caterers/auth/login')
      .send({
        email: 'princeuggo@gmail.com',
        password: '12345678',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.be.an('object');
        process.env.tokenExpCAT = res.body.token;
        done();
      });
  });
  it('should tell the caterer that token has expired', (done) => {
    chai.request(app)
      .get('/api/v1/meals')
      .set({ Authorization: process.env.tokenExpCAT })
      .end((err, res) => {
        expect(res.status).to.be.eql(401);
        expect(res.type).to.be.equal('application/json');
        expect(res.body).to.be.an('array');
      });
    chai.request(app)
      .post('/api/v1/meals')
      .set({ Authorization: process.env.tokenExpCAT })
      .send(meal)
      .end((err, res) => {
        expect(res.status).to.be.eql(401);
        expect(res.type).to.be.equal('application/json');
        expect(res.body).to.be.an('array');
      });
    chai.request(app)
      .put('/api/v1/meals/1')
      .set({ Authorization: process.env.tokenExpCAT })
      .send(mealUpdate1)
      .end((err, res) => {
        expect(res.status).to.be.eql(401);
        expect(res.type).to.be.equal('application/json');
        expect(res.body).to.be.an('array');
      });
    chai.request(app)
      .delete('/api/v1/meals/1')
      .set({ Authorization: process.env.tokenExpCAT })
      .end((err, res) => {
        expect(res.status).to.be.eql(401);
        expect(res.type).to.be.equal('application/json');
        expect(res.body).to.be.an('array');
      });
    done();
  });
});
