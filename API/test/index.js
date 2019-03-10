/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint linebreak-style: ["error", "windows"] */
/* global describe:true, it:true */
import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from './app';

chai.use(chaiHttp);

describe('App Entry Points', () => {
  it('should show an html page welcome the user and telling them about the api endpoints', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.text).to.be.eql(
          '<div>'
      + '<h1>Welcome to Meal-Booking-App api</h1>'
      + '<h3>Follow this <a href="https://app.swaggerhub.com/apis-docs/uggo/meal-booking-api/1.0.0" target="blank" style="text-decoration:none;color:#2581DC;">Documentation</a> to consume this API.</h3>'
    + '</div>',
        );
        done();
      });
  });
});
