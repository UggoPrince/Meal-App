/* eslint-disable import/no-extraneous-dependencies */
/* eslint linebreak-style: ["error", "windows"] */
/* global describe:true, it:true */
import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();
chai.use(chaiHttp);

describe('Orders Test', () => {
  describe('PUT /api/v1/orders/:id', () => {
    it('should not modify an order that does not exist and tell the user it exist not', (done) => {
      chai.request(app)
        .put('/api/v1/orders/1')
        .set({ Authorization: process.env.tokenCUST })
        .send({
          mealId: 5,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.be.eql(['Invalid orderId.']);
          done();
        });
    });
  });

  describe('GET /api/v1/orders', () => {
    it('should tell the user that there are no orders available.', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .set({ Authorization: process.env.tokenCAT })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.eql(['Your Customers have made no order(s).']);
          done();
        });
    });
  });

  describe('POST /api/v1/orders', () => {
    it('should make an order', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .set({ Authorization: process.env.tokenCUST })
        .send({
          mealId: 1,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.body).to.be.an('array');
          done();
        });
    });
    it('should make an order if no token is sent', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .set({ Authorization: '' })
        .send({
          mealId: 1,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(401);
          expect(res.body).to.be.an('array');
          done();
        });
    });
    it('should not make an order if no mealId is sent', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .set({ Authorization: process.env.tokenCUST })
        .send()
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.be.an('array');
          done();
        });
    });
    it('should not make an order if no mealId was sent', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .set({ Authorization: process.env.tokenCUST })
        .send({
          mealId: '',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.be.an('array');
        });
      done();
    });
    it('should not make an order if either mealId, customer or catererId is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .set({ Authorization: process.env.tokenCUST })
        .send({
          mealId: 'p',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.be.eql(['No meal with mealId p.']);
        });
      done();
    });
  });


  describe('PUT /api/v1/orders/:id', () => {
    it('should not modify an order if the orderId is invalid', (done) => {
      chai.request(app)
        .put('/api/v1/orders/p')
        .set({ Authorization: process.env.tokenCUST })
        .send({
          mealId: 1,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.eql(['Invalid mealId/orderId.']);
          done();
        });
    });
    it('should not modify an order if no mealId is sent.', (done) => {
      chai.request(app)
        .put('/api/v1/orders/1')
        .set({ Authorization: process.env.tokenCUST })
        .send({ mealId: '' })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.be.eql(['Invalid mealId/orderId.']);
        });
      done();
    });
    it('should not modify an order if the orderId sent is not available.', (done) => {
      chai.request(app)
        .put('/api/v1/orders/4')
        .set({ Authorization: process.env.tokenCUST })
        .send({ mealId: 5 })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.be.eql(['Invalid orderId.']);
          done();
        });
    });
    it('should not modify an order if no token is sent.', (done) => {
      chai.request(app)
        .put('/api/v1/orders/1')
        .set({ Authorization: '' })
        .send({ mealId: 5 })
        .end((err, res) => {
          expect(res.status).to.be.eql(401);
          expect(res.body).to.be.an('array');
          done();
        });
    });
    it('should modify an order if the orderId exist.', (done) => {
      chai.request(app)
        .put('/api/v1/orders/1')
        .set({ Authorization: process.env.tokenCUST })
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
        .set({ Authorization: process.env.tokenCAT })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not get all orders when no token is sent.', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .set({ Authorization: '' })
        .end((err, res) => {
          expect(res.status).to.be.eql(401);
          expect(res.body).to.be.eql(['No Authorization header sent. Login as a Caterer and send a token.']);
          done();
        });
    });
  });
});
