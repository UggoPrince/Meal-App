/* eslint-disable import/no-extraneous-dependencies */
/* eslint linebreak-style: ["error", "windows"] */
/* global describe:true, it:true */
import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from './app';

chai.use(chaiHttp);

describe('Customers Test', () => {
  describe('POST /api/v1/customers/auth/signup', () => {
    it('should register a customer', (done) => {
      chai.request(app)
        .post('/api/v1/customers/auth/signup')
        .send({
          firstname: 'john',
          lastname: 'doe',
          email: 'ugo@gmail.com',
          password: '12345678',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.type).to.be.equal('application/json');
        });
      done();
    });
    it('should not register a customer', (done) => {
      chai.request(app)
        .post('/api/v1/customers/auth/signup')
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
        });
      chai.request(app)
        .post('/api/v1/customers/auth/signup')
        .send({
          firstname: 'john',
          lastname: 'doe',
          email: 'uggogmail.com',
          password: '1234',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
        });
      done();
    });
    it('should not register a customer', (done) => {
      chai.request(app)
        .post('/api/v1/customers/auth/signup')
        .send({
          firstname: 'john',
          lastname: 'doe',
          email: 'ugo@gmail.com',
          password: '12345678',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
        });
      done();
    });
  });
  describe('POST /api/v1/customers/auth/login', () => {
    it('should not login the user', (done) => {
      chai.request(app)
        .post('/api/v1/customers/auth/login')
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.eql(['Invalid Customer email and/or password. Simply Register.']);
        });
      done();
    });
    it('should login the user', (done) => {
      chai.request(app)
        .post('/api/v1/customers/auth/login')
        .send({
          email: 'ugo@gmail.com',
          password: '12345678',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
        });
      done();
    });
  });
});
