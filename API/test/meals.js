/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint linebreak-style: ["error", "windows"] */
/* global describe:true, it:true, before */
import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import JWT from '../server/helpers/JWT';
import app from './app';

dotenv.config();
chai.use(chaiHttp);
let token = '';

describe('Meals Test', () => {
  process.env.tokenTime = 0.5;
  before(() => {
    it('sholud get caterer token', (done) => {
      chai.request(app)
        .post('/api/v1/caterers/auth/login')
        .send({
          email: 'uggo@gmail.com',
          password: '12345678',
        })
        .end((err, res) => {
          token = res.body;
          done();
        });
    });
  });
  describe('GET /api/v1/meals', () => {
    it('should not get meals', (done) => {
      chai.request(app)
        .get('/api/v1/meals')
        .end((err, res) => {
          expect(res.status).to.be.eql(401);
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
    it('should not get meal', async () => {
      chai.request(app)
        .get('/api/v1/meals1')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.type).to.be.equal('application/json');
        });
    });
    describe('', () => {
      it('should get caterer token', async () => {
        process.env.tokenTime = -1;
        const tok = await chai.request(app)
          .post('/api/v1/caterers/auth/login')
          .send({
            email: 'uggo@gmail.com',
            password: '12345678',
          });
        token = tok.body.token;
      });
      it('should not get meals', (done) => {
        chai.request(app)
          .get('/api/v1/meals')
          // eslint-disable-next-line quote-props
          .set({ 'Authorization': token })
          .end((err, res) => {
            expect(res.status).to.be.eql(401);
            expect(res.type).to.be.equal('application/json');
            expect(res.body).to.be.eql(['Session expired. Login as a Caterer to get meals.']);
            done();
          });
      });
      process.env.tokenTime = 1200;
      it('should get caterer token', async () => {
        const result = await chai.request(app)
          .post('/api/v1/caterers/auth/login')
          .send({
            email: 'uggo@gmail.com',
            password: '12345678',
          // eslint-disable-next-line arrow-body-style
          });
        token = result.body;
      });
    });
    it('should not get meals', async () => {
      const result = await chai.request(app)
        .get('/api/v1/meals')
        // eslint-disable-next-line quote-props
        .set({ 'Authorization': token.token });
      expect(result.status).to.be.eql(401);
      expect(result.type).to.be.equal('application/json');
    });
  });

  describe('POST /api/v1/meals', () => {
    /* beforeAll(async ()=>{
      process.env.tokenTime = 1200;
        const result = await chai.request(app)
          .post('/api/v1/caterers/auth/login')
          .send({
            email: 'uggo@gmail.com',
            password: '12345678',
          // eslint-disable-next-line arrow-body-style
          });
        token = result.body.token;
      });
    }); */
    const meal = {
      name: 'rice and stew',
      size: 'plates',
      price: 400,
      currency: 'USD',
      catererId: 1,
    };

    /* it('should add a meal', (done) => {
      const t = token.token;
      chai.request(app)
        .post('/api/v1/meals')
        .set('Authorization', t)
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
    }); */
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
    it('should not add a meal when either meal name, size, price, currency and catererId (caterer) is not sent.', (done) => {
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
  /* describe('PUT /api/v1/meals/:id', () => {
    const mealUpdate1 = {
      name: 'Eba and Egusi',
      price: 450,
    };
    it('should modify a meals name and price', (done) => {
      chai.request(app)
        .put('/api/v1/meals/1')
        .send(mealUpdate1)
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
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
          expect(res.status).to.be.eql(200);
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
          expect(res.status).to.be.eql(200);
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
          expect(res.status).to.be.eql(200);
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
  }); */
});
