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
  describe('PUT /api/v1/meals/:id', () => {
    const mealUpdate1 = {
      name: 'Eba and Egusi',
      price: '450',
    };
    it('should modify a meals name and price', (done) => {
      chai.request(app)
        .put('/api/v1/meals/1')
        .send(mealUpdate1)
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('Object');
          expect(res.body).to.be.eql({
            message: 'success',
            body: {
              id: 1,
              name: 'Eba and Egusi',
              size: 'plates',
              price: '450',
              currency: 'NGN',
              caterer_id: '1',
            },
          });
          done();
        });
    });
    it('should modify a meals name', (done) => {
      chai.request(app)
        .put('/api/v1/meals/2')
        .send({ name: mealUpdate1.name })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('Object');
          done();
        });
    });
    it('should modify a meal\'s price.', (done) => {
      chai.request(app)
        .put('/api/v1/meals/3')
        .send({ price: mealUpdate1.price })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('Object');
          done();
        });
    });
    it('should not modify a meal if the user doesn\'t any value for update', (done) => {
      chai.request(app)
        .put('/api/v1/meals/3')
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('Object');
          expect(res.body).to.be.eql({
            message: 'error',
            error: 'No data for the name and/or price update of meal was submitted',
          });
          done();
        });
    });
    it('should not modify a meal if a wrong id excluding zero 0 was is in the endpoint', (done) => {
      chai.request(app)
        .put('/api/v1/meals/78')
        .send(mealUpdate1)
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('Object');
          expect(res.body).to.be.eql({
            message: 'error',
            error: 'invalid ID',
          });
          done();
        });
    });
    it('should not modify a meal if an id of zero 0 was entered in the endpoint', (done) => {
      chai.request(app)
        .put('/api/v1/meals/0')
        .send()
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('Object');
          expect(res.body).to.be.eql({
            message: 'error',
            error: 'invalid ID',
          });
          expect(err).to.be.deep.eq(null);
          done();
        });
    });
    it('should not modify a meal if an alphabet or symbol is entered in the endpoint as an id', (done) => {
      chai.request(app)
        .put('/api/v1/meals/u')
        .send()
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('Object');
          expect(res.body).to.be.eql({
            message: 'error',
            error: 'invalid ID',
          });
          done();
        });
    });
    it('should not modify a meal if no id is entered in the endpoint', (done) => {
      chai.request(app)
        .put('/api/v1/meals/')
        .send()
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.a('string');
          expect(res.body).to.be.eql('Not Found');
          done();
        });
    });
  });
});
