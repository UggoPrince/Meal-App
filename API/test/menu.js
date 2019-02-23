/* eslint-disable import/no-extraneous-dependencies */
/* eslint linebreak-style: ["error", "windows"] */
/* global describe:true, it:true */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('Menu Tests', () => {
  describe('GET /api/v1/menu', () => {
    it('should tell the caterer to add a menu because non is available', (done) => {
      chai.request(app)
        .get('/api/v1/menu')
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.eql({
            message: 'success',
            body: 'No Menu in your account. Set up a Menu now with the following fields below.',
            fields: ' mealId(s) (one or meal id with the same key name [ mealId ]), and catererId (only one!)',
          });
          done();
        });
    });
  });
  describe('POST /api/v1/menu', () => {
    const menu = {
      mealId: [1, 2],
      catererId: 13,
    };
    const menu2 = {
      mealId: [1, 2],
      catererId: 19,
    };

    it('should add a menu', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send(menu)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.body).to.be.an('Object');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send(menu)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.body).to.be.an('Object');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send(menu2)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.body).to.be.an('Object');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: '1',
          catererId: 5,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.body).to.be.an('Object');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: '-1',
          catererId: 5,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.be.an('Object');
        });
      done();
    });
    it('should tell the caterer that no mealId and catererId was sent for the menu', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.be.an('Object');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: '',
          catererId: '',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.be.an('object');
        });
      done();
    });
    it('should notify the caterer that no mealId or CatererId was sent', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: '',
          catererId: '',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.be.eql({
            message: 'error',
            error: {
              catererId: 'Your catererId is required.',
              mealId: 'The mealId(s) is required.',
            },
          });
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: [1],
          catererId: '',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.eql({
            message: 'error',
            error: {
              catererId: 'Your catererId is required',
            },
          });
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: '',
          catererId: 45,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.be.eql({
            message: 'error',
            error: {
              mealId: 'The mealId(s) is required.',
            },
          });
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
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.eql({
            message: 'error',
            error: {
              catererId: 'caterer id [-1] is invalid.',
            },
          });
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: ['y', 1],
          catererId: 3,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.eql({
            message: 'error',
            error: {
              mealId: {
                'mealId 1': 'mealId y is invalid',
              },
            },
          });
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: [2, 1],
          catererId: 'y',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
        });
      done();
    });
  });
  describe('GET /api/v1/menu', () => {
    it('should get available menus', (done) => {
      chai.request(app)
        .get('/api/v1/menu')
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('Object');
          done();
        });
    });
  });
});
