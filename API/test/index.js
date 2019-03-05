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
            + '<h1>Welcome to Meal-Booking-App</h1>'
            + '<h3>Below are the endpoints to access this API</h3>'
            + '<ul>'
                + '<li>GET /api/v1/meals</li>'
                + '<li>POST /api/v1/meals</li>'
                + '<li>PUT /api/v1/meals/mealId</li>'
                + '<li>DELETE /api/v1/meals/mealId</li>'
                + '<li>POST /api/v1/menu</li>'
                + '<li>GET /api/v1/menu</li>'
                + '<li>POST /api/v1/orders</li>'
                + '<li>PUT /api/v1/orders</li>'
                + '<li>GET /api/v1/orders</li>'
            + '</ul>'
        + '</div>',
        );
        done();
      });
  });
});
