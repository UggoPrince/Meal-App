/* eslint-disable import/no-extraneous-dependencies */
/* eslint linebreak-style: ["error", "windows"] */
/* global describe:true, it:true */
import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from './app';

chai.use(chaiHttp);

describe('Menu Tests', () => {
  describe('GET /api/v1/menu', () => {
    it('should tell the caterer to add a menu because non is available', (done) => {
      chai.request(app)
        .get('/api/v1/menu')
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.eql(['No menu available. Add one.']);
          done();
        });
    });
  });
  describe('POST /api/v1/menu', () => {
    const menu = {
      mealId: [1, 2],
      catererId: 1,
    };
    const menu2 = {
      mealId: [1, 2],
      catererId: 1,
    };
    it('should add a menu', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send(menu)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.body).to.be.an('array');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send(menu)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.body).to.be.an('array');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send(menu2)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.body).to.be.an('array');
        });
      done();
    });
    it('should tell the caterer that no mealId and catererId was sent for the menu', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.body).to.be.an('array');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: '',
          catererId: '',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.body).to.be.an('array');
        });
      done();
    });
    it('should notify the caterer that no mealId or CatererId was sent.', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: '',
          catererId: '',
        })
        .end((err, res) => {
          expect(res.status).to.deep.eql(400);
          expect(res.body).to.be.an('array');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: [1],
          catererId: '',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('array');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: '',
          catererId: 45,
        })
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body).to.be.an('array');
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
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('array');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: ['y', 1],
          catererId: 3,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          mealId: [5],
          catererId: 1,
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
          expect(res.status).to.eql(200);
          done();
        });
    });
  });
});
