/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mealsRouter from './routes/mealsRoute';
import menuRouter from './routes/menuRoute';
import orderRouter from './routes/ordersRoute';
import customersRouter from './routes/customersRoute';
import caterersRouter from './routes/caterersRoute';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200).send(
  '<div>'
      + '<h1>Welcome to Meal-Booking-App</h1>'
      + '<h2><a href="https://app.swaggerhub.com/apis-docs/uggo/meal-booking-api/1.0.0" style="text-decoration:none;">API Documentation on Swagger</a></h2>'
      + '<h3>Below are the endpoints to access this API</h3>'
      + '<ul>'
        + '<li><p>Send Header >>> Authorization : token</p></li>'
        + '<li><p>POST /api/v1/caterers/auth/signup<p><span> With the following keys:'
        + '<b> firstname, lastname, restaurant, email, password</span></li>'
        + '<li><p>POST /api/v1/caterers/auth/login</p><span> With the following keys:'
        + '<b> email, password</span></li>'
        + '<li><p>POST /api/v1/customers/auth/signup<p><span> With the following keys:'
        + '<b> firstname, lastname, email, password</span></li>'
        + '<li><p>POST /api/v1/customers/auth/login</p><span> With the following keys:'
        + '<b> email, password</span></li>'
        + '<li><p>GET /api/v1/meals<p></li>'
        + '<li><p>GET /api/v1/meals<p></li>'
        + '<li><p>POST /api/v1/meals<p><span>With the following keys: '
        + '<b>name (string), size (string), price (integer), currency (string), catererId (integer).</b></span></li>'
        + '<li><p>PUT /api/v1/meals/id<p><span>With the following keys: <b>name, price.</b></span></li>'
        + '<li><p>DELETE /api/v1/meals/id<p></li>'
        + '<li><p>POST /api/v1/menu<p><span>With the following keys: '
        + '<b>mealId(s) (integer) (one or more with same key name [mealId]), catererId (interger).</b></span></li>'
        + '<li><p>GET /api/v1/menu</p></li>'
        + '<li><p>POST /api/v1/orders</p><span>With the following keys: '
        + '<b>mealId (integer), customerId (integer), catererId (integer)</b></span></li>'
        + '<li><p>PUT /api/v1/orders/id</p><span>With the following keys: '
        + '<b>mealId (integer)</b></span></li>'
        + '<li><p>GET /api/v1/orders</p></li>'
      + '</ul>'
    + '</div>',
));

app.use('/api/v1', customersRouter);
app.use('/api/v1', caterersRouter);
app.use('/api/v1', mealsRouter);
app.use('/api/v1', menuRouter);
app.use('/api/v1', orderRouter);

app.use((req, res) => {
  res.status(404).json('Not Found');
});

export default app;
