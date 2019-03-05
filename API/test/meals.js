/* eslint-disable import/no-extraneous-dependencies */
/* eslint linebreak-style: ["error", "windows"] */
/* global describe:true, it:true */
import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from './app';

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
      price: 400,
      currency: 'USD',
      catererId: 1,
    };
    /* const addedMeal = {
      id: 4,
      name: 'rice and stew',
      size: 'plates',
      price: '400',
      currency: 'USD',
      catererId: '1',
    }; */
    it('should add a meal', (done) => {
      chai.request(app)
        .post('/api/v1/meals')
        .send(meal)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('Object');
        });
      chai.request(app)
        .post('/api/v1/meals')
        .send(meal)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('Object');
        });
      chai.request(app)
        .post('/api/v1/meals')
        .send(meal)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('Object');
        });
      chai.request(app)
        .post('/api/v1/meals')
        .send(meal)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('Object');
        });
      done();
    });
    it('should not add a meal when nothing is sent', (done) => {
      chai.request(app)
        .post('/api/v1/meals')
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('Array');
          done();
        });
    });
    it('should not add a meal when either meal name, size, price, currency and catererId (caterer) is not sent or is not valid.', (done) => {
      chai.request(app)
        .post('/api/v1/meals')
        .send({
          size: 'plates',
          price: 400,
          currency: 'USD',
          catererId: 1,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.eql(['meal.name cannot be null']);
        });
      chai.request(app)
        .post('/api/v1/meals')
        .send({
          name: 'rice and stew',
          size: '',
          price: '400',
          currency: 'USD',
          catererId: '1',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.eql(['size is required.']);
        });
      chai.request(app)
        .post('/api/v1/meals')
        .send({
          name: 'rice and stew',
          size: 'plates',
          price: '',
          currency: 'USD',
          catererId: '1',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.eql(['price must be numeric', 'price is required.']);
        });
      chai.request(app)
        .post('/api/v1/meals')
        .send({
          name: 'rice and stew',
          size: 'plates',
          price: '400',
          currency: '',
          catererId: '1',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('array');
        });
      chai.request(app)
        .post('/api/v1/meals')
        .send({
          name: 'rice and stew',
          size: 'plates',
          price: '400',
          currency: 'USD',
          catererId: 9,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('array');
        });
      done();
    });
  });
  describe('PUT /api/v1/meals/:id', () => {
    const mealUpdate1 = {
      name: 'Eba and Egusi',
      price: 450,
    };
    it('should modify a meals name and price', (done) => {
      chai.request(app)
        .put('/api/v1/meals/1')
        .send(mealUpdate1)
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('array');
          done();
        });
    });
    it('should modify a meals name', (done) => {
      chai.request(app)
        .put('/api/v1/meals/1')
        .send({ name: mealUpdate1.name })
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('array');
          done();
        });
    });
    it('should modify a meal\'s price.', (done) => {
      chai.request(app)
        .put('/api/v1/meals/1')
        .send({ price: mealUpdate1.price })
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('array');
          done();
        });
    });
    it('should not modify a meal if the user doesn\'t submit any value for update', (done) => {
      chai.request(app)
        .put('/api/v1/meals/1')
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('array');
          done();
        });
    });
    it('should not modify a meal if a wrong id excluding zero 0 was is in the endpoint', (done) => {
      chai.request(app)
        .put('/api/v1/meals/78')
        .send(mealUpdate1)
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('array');
          expect(res.body).to.be.eql(['Invalid meal id.']);
          done();
        });
    });
    it('should not modify a meal if an id of zero 0 was entered in the endpoint', (done) => {
      chai.request(app)
        .put('/api/v1/meals/0')
        .send()
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('array');
          expect(res.body).to.be.eql(['Invalid meal id.']);
          done();
        });
    });
    it('should not modify a meal if an alphabet or symbol is entered in the endpoint as an id', (done) => {
      chai.request(app)
        .put('/api/v1/meals/u')
        .send()
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('array');
          done();
        });
    });
    it('should not modify a meal if a minus(-) interger (example: -1) is entered in the endpoint as an id', (done) => {
      chai.request(app)
        .put('/api/v1/meals/-1')
        .send()
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('array');
          done();
        });
    });
    it('should not modify a meal if no meal name and price is inputted.', (done) => {
      chai.request(app)
        .put('/api/v1/meals/2')
        .send({
          name: '',
          price: '',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('array');
          done();
        });
    });
    it('should not modify a meal if no id is entered in the endpoint', (done) => {
      chai.request(app)
        .put('/api/v1/meals')
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.a('string');
          expect(res.body).to.be.eql('Not Found');
          done();
        });
    });
    it('should not modify a meal if wrong value types are entered for meal name and/or price.', (done) => {
      chai.request(app)
        .put('/api/v1/meals/1')
        .send(
          {
            name: 45,
            price: 400,
          },
        )
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
        });
      chai.request(app)
        .put('/api/v1/meals/2')
        .send(
          {
            name: 'beans',
            price: 'kj',
          },
        )
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
        });
      done();
    });
  });
  describe('DELETE /api/v1/meals/:id', () => {
    it('should delete a meal when the request is sent with the correct id', (done) => {
      chai.request(app)
        .delete('/api/v1/meals/3')
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.eql(['Meal successfully deleted.']);
          done();
        });
    });
    it('should not delete a meal when the request is sent with an incorrect id (example: -1, p, 0, or one that exist not)', (done) => {
      chai.request(app)
        .delete('/api/v1/meals/-1')
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.be.eql(['Invalid meal id.']);
          done();
        });
    });
    it('should not', (done) => {
      chai.request(app)
        .delete('/api/v1/meals/p')
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.be.eql(['Invalid meal id.']);
          done();
        });
    });
    it('should not', (done) => {
      chai.request(app)
        .delete('/api/v1/meals/0')
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.be.eql(['Invalid meal id.']);
          done();
        });
    });
  });
  describe('GET /api/v1/meals', () => {
    it('should get all meals', (done) => {
      chai.request(app)
        .get('/api/v1/meals')
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
