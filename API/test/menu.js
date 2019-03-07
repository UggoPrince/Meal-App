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

describe('Menu Tests', () => {
  describe('GET /api/v1/menu', () => {
    it('should tell the caterer to add a menu because non is available', (done) => {
      chai.request(app)
        .get('/api/v1/menu')
        .set({ Authorization: process.env.tokenCAT })
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
    };
    const menu2 = {
      mealId: [1, 2],
    };
    it('should add a menu', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .set({ Authorization: process.env.tokenCAT })
        .send(menu)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.body).to.be.an('array');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .set({ Authorization: process.env.tokenCAT })
        .send(menu)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.body).to.be.an('array');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .set({ Authorization: process.env.tokenCAT })
        .send(menu2)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.body).to.be.an('array');
        });
      done();
    });
    it('should tell the caterer that no mealId was sent for the menu', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .set({ Authorization: process.env.tokenCAT })
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.body).to.be.an('array');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .set({ Authorization: process.env.tokenCAT })
        .send({
          mealId: '',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.body).to.be.an('array');
        });
      done();
    });
    it('should notify the caterer that no mealId was sent.', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .set({ Authorization: process.env.tokenCAT })
        .send({
          mealId: '',
        })
        .end((err, res) => {
          expect(res.status).to.deep.eql(400);
          expect(res.body).to.be.an('array');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .set({ Authorization: process.env.tokenCAT })
        .send({
          mealId: '',
        })
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body).to.be.an('array');
        });
      done();
    });
    it('should not add a menu if an invalid meal Id is sent', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .set({ Authorization: process.env.tokenCAT })
        .send({
          mealId: ['y'],
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
        });
      chai.request(app)
        .post('/api/v1/menu')
        .set({ Authorization: process.env.tokenCAT })
        .send({
          mealId: [5],
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
        });
      done();
    });
    it('should not add a menu if no token is sent', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .set({ Authorization: '' })
        .send({
          mealId: [1],
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(401);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.eql(['No Authorization header sent. Login and send a token.']);
          done();
        });
    });
  });
  describe('GET /api/v1/menu', () => {
    it('should get available menus', (done) => {
      chai.request(app)
        .get('/api/v1/menu')
        .set({ Authorization: process.env.tokenCUST })
        .end((err, res) => {
          expect(res.status).to.eql(200);
          done();
        });
    });
    it('should not get available menus when no token is sent', (done) => {
      chai.request(app)
        .get('/api/v1/menu')
        .set({ Authorization: '' })
        .end((err, res) => {
          expect(res.status).to.eql(401);
          expect(res.body).to.be.eql(['No Authorization header sent. Login and send a token.']);
          done();
        });
    });
  });
});
