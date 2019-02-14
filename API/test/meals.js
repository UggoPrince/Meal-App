/* eslint-disable import/no-extraneous-dependencies */
/* eslint linebreak-style: ["error", "windows"] */
/* global describe:true, it:true */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('Meals Test', () => {
  describe('GET /api/v1/meals', () => {
    it('should get all meals', (done) => {
      chai.request(app)
        .get('/api/v1/meals')
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('array');
          done();
        });
    });
    it('should return "Not Found" when a wrong a url is sent', (done) => {
      chai.request(app)
        .get('/api/v1/meals1')
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.a('string');
          done();
        });
    });
  });

  describe('POST /api/v1/meals', () => {
    const meal = {
      name: 'rice and stew',
      size: 'plates',
      price: '400',
      currency: 'USD',
      caterer: '18',
    };
    const addedMeal = {
      id: 4,
      name: 'rice and stew',
      size: 'plates',
      price: '400',
      currency: 'USD',
      caterer_id: '18',
    };
    it('should add a meal', (done) => {
      chai.request(app)
        .post('/api/v1/meals')
        .send(meal)
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('Object');
          expect(res.body).to.be.eql({ message: 'success', body: addedMeal });
          done();
        });
    });
    it('should return "Not Found" when a wrong a url is sent', (done) => {
      chai.request(app)
        .post('/api/v1/mealsK')
        .send(meal)
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.a('string');
          done();
        });
    });
  });
});
