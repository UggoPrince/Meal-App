/* eslint-disable import/no-extraneous-dependencies */
/* eslint linebreak-style: ["error", "windows"] */
/* global describe:true, it:true */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('Orders Test', () => {
  describe('POST /api/v1/orders', () => {
    it('should not make an order if no mealId, customerId and CatererId is sent', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send()
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.eql({ message: 'error', error: 'No mealId, customerId and catererId was sent' });
          done();
        });
    });
    it('should not make an order if neither mealId, customerId or CatererId is sent', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          customerId: 3,
          catererId: 6,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.eql({ message: 'error', error: 'No mealId was sent!' });
        });
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          mealId: 3,
          catererId: 6,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.eql({ message: 'error', error: 'No customerId was sent!' });
        });
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          mealId: 4,
          customerId: 3,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.eql({ message: 'error', error: 'No catererId was sent!' });
        });
      done();
    });
    it('should not make an order if either mealId, customer or catererId is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          mealId: 'p',
          customerId: 3,
          catererId: 6,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.eql({ message: 'error', error: 'meal id [p] is not valid.' });
        });
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          mealId: 2,
          customerId: -1,
          catererId: 6,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.eql({ message: 'error', error: 'customer id [-1] is not valid.' });
        });
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          mealId: 8,
          customerId: 3,
          catererId: 'l',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.eql({ message: 'error', error: 'caterer id [l] is not valid.' });
        });
      done();
    });
    it('should make an order', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          mealId: 5,
          customerId: 3,
          catererId: 6,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('Object');
          done();
        });
    });
  });
});
