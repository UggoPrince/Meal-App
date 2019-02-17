/* eslint-disable import/no-extraneous-dependencies */
/* eslint linebreak-style: ["error", "windows"] */
/* global describe:true, it:true */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('Orders Test', () => {
  describe('PUT /api/v1/orders/:id', () => {
    it('should not modify an order that does not exist and tell the user it exist not', (done) => {
      chai.request(app)
        .put('/api/v1/orders/1')
        .send({
          mealId: 3,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('Object');
          done();
        });
    });
  });

  describe('GET /api/v1/orders', () => {
    it('should tell the user that there are no orders available.', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('Object');
          done();
        });
    });
  });

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


  describe('PUT /api/v1/orders/:id', () => {
    it('should not modify an order if the orderId is invalid', (done) => {
      chai.request(app)
        .put('/api/v1/orders/p')
        .send()
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('Object');
          done();
        });
    });
    it('should not modify an order if the no mealId is sent.', (done) => {
      chai.request(app)
        .put('/api/v1/orders/2')
        .send()
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('Object');
        });
      chai.request(app)
        .put('/api/v1/orders/2')
        .send({ mealId: '' })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('Object');
        });
      done();
    });
    it('should not modify an order if the mealId sent is not valid.', (done) => {
      chai.request(app)
        .put('/api/v1/orders/2')
        .send({ mealId: '-1' })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('Object');
          done();
        });
    });
    it('should not modify an order if the orderId sent is not available.', (done) => {
      chai.request(app)
        .put('/api/v1/orders/2')
        .send({ mealId: 5 })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('Object');
          expect(res.body).to.be.eql({ message: 'error', error: 'No order with the id [2]' });
          done();
        });
    });
    it('should not modify an order if the orderId exist.', (done) => {
      chai.request(app)
        .put('/api/v1/orders/1')
        .send({ mealId: 5 })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('Object');
          done();
        });
    });
  });

  describe('GET /api/v1/orders', () => {
    it('should get all orders.', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('Object');
          done();
        });
    });
  });
});
