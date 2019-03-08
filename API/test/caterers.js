/* eslint-disable import/no-extraneous-dependencies */
/* eslint linebreak-style: ["error", "windows"] */
/* global describe:true, it:true, before */
import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import { seq } from '../server/models/Sequelizer';
import app from './app';

dotenv.config();
chai.use(chaiHttp);

describe('Caterers Test', () => {
  before('Create Tables.', async () => {
    await seq.createTables(true);
  });

  describe('POST /api/v1/caterers/auth/signup', () => {
    it('should register a caterer', (done) => {
      chai.request(app)
        .post('/api/v1/caterers/auth/signup')
        .send({
          firstname: 'john',
          lastname: 'doe',
          email: 'uggo@gmail.com',
          password: '12345678',
          restaurant: 'mr Rills',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.type).to.be.equal('application/json');
        });
      chai.request(app)
        .post('/api/v1/caterers/auth/signup')
        .send({
          firstname: 'john',
          lastname: 'doe',
          email: 'princeuggo@gmail.com',
          password: '12345678',
          restaurant: 'mr Rills',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.type).to.be.equal('application/json');
        });
      done();
    });
    it('should not register a caterer', (done) => {
      chai.request(app)
        .post('/api/v1/caterers/auth/signup')
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
        });
      chai.request(app)
        .post('/api/v1/caterers/auth/signup')
        .send({
          firstname: 'john',
          lastname: 'doe',
          email: 'uggogmail.com',
          password: '1234',
          restaurant: '',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
        });
      done();
    });
    it('should not register twice', (done) => {
      chai.request(app)
        .post('/api/v1/caterers/auth/signup')
        .send({
          firstname: 'john',
          lastname: 'doe',
          email: 'uggo@gmail.com',
          password: '12345678',
          restaurant: 'mr Rills',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
        });
      done();
    });
  });


  describe('POST /api/v1/caterers/auth/login', () => {
    it('should not login the user', (done) => {
      chai.request(app)
        .post('/api/v1/caterers/auth/login')
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.eql(['Invalid Caterer email and/or password. Simply Register.']);
        });
      done();
    });
    it('should login the user', (done) => {
      chai.request(app)
        .post('/api/v1/caterers/auth/login')
        .send({
          email: 'uggo@gmail.com',
          password: '12345678',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('object');
          process.env.tokenCAT = res.body.token;
        });
      done();
    });
  });
});
