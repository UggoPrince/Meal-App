/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint linebreak-style: ["error", "windows"] */
/* global describe:true, it:true, after */
import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();
chai.use(chaiHttp);

describe('Order test when token expires', () => {
  after(() => {
    process.env.tokenTime = 3600;
  });
  it('should tell caterer that token has expired', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set({ Authorization: process.env.tokenExpCUST })
      .send({
        mealId: 1,
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(401);
        expect(res.type).to.be.equal('application/json');
        expect(res.body).to.be.an('array');
        done();
      });
  });
  it('should tell caterer that token has expired.', (done) => {
    chai.request(app)
      .get('/api/v1/orders')
      .set({ Authorization: process.env.tokenExpCAT })
      .end((err, res) => {
        expect(res.status).to.be.eql(401);
        expect(res.type).to.be.equal('application/json');
        expect(res.body).to.be.an('array');
        done();
      });
  });
  it('should tell customer that token has expired', (done) => {
    chai.request(app)
      .put('/api/v1/orders/1')
      .set({ Authorization: process.env.tokenExpCUST })
      .send({
        mealId: 5,
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(401);
        expect(res.type).to.be.equal('application/json');
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
