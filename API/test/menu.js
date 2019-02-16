/* eslint-disable import/no-extraneous-dependencies */
/* eslint linebreak-style: ["error", "windows"] */
/* global describe:true, it:true */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('Menu Tests', () => {
  describe('POST /api/v1/menu', () => {
    const menu = {
      mealId: [1, 2],
      catererId: 13,
    };
    const menu2 = {
      mealId: [1, 2],
      catererId: 19,
    };
    it('should tell the caterer that no mealId and catererId was sent for the menu', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('Object');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: '',
          catererId: '',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('object');
        });
      done();
    });
    it('should notify the caterer that no mealId or CatererId was sent', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: [],
          catererId: '',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.eql({ message: 'error', error: 'No meal id(s) (mealId) and caterer id (catererId) was sent' });
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: [1],
          catererId: '',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: [],
          catererId: 45,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.eql({ message: 'error', error: 'No meal id(s) (mealId) was sent!' });
        });
      done();
    });
    it('should not add a menu if an invalid meal and/or caterer Id is sent', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: [1, 2],
          catererId: -1,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.eql({ message: 'error', error: 'caterer id [-1] is not valid.' });
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: ['y', 1],
          catererId: 3,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.eql({ message: 'error', error: 'meal id [y] is not valid.' });
        });
      done();
    });
    it('should add a menu', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send(menu)
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('Object');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send(menu)
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('Object');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send(menu2)
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('Object');
        });
      done();
    });
  });
});
