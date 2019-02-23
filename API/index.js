/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mealsRouter from './server/routes/mealsRoute';
import menuRouter from './server/routes/menuRoute';
import orderRouter from './server/routes/ordersRoute';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200).send(
  '<div>'
      + '<h1>Welcome to Meal-Booking-App</h1>'
      + '<h3>Below are the endpoints to access this API</h3>'
      + '<ul>'
        + '<li><p>GET /api/v1/meals<p></li>'
        + '<li><p>POST /api/v1/meals<p><span>With the follow keys: '
        + '<b>name (string), size (string), price (integer), currency (string), catererId (integer).</b></span></li>'
        + '<li><p>PUT /api/v1/meals/id<p><span>With the following keys: <b>name, price.</b></span></li>'
        + '<li><p>DELETE /api/v1/meals/id<p></li>'
        + '<li><p>POST /api/v1/menu<p><span>With the following keys: '
        + '<b>mealId(s) (integer) (one or more with same key name [mealId]), catererId (interger).</b></span></li>'
        + '<li><p>GET /api/v1/menu</p></li>'
        + '<li><p>POST /api/v1/orders</p><span>With the following keys: '
        + '<b>mealId (integer), customerId (integer), catererId (integer)</b></span></li>'
        + '<li><p>PUT /api/v1/orders</p><span>With the following keys: '
        + '<b>mealId (integer)</b></span></li>'
        + '<li><p>GET /api/v1/orders</p></li>'
      + '</ul>'
    + '</div>',
));

app.use('/api/v1', mealsRouter);
app.use('/api/v1', menuRouter);
app.use('/api/v1', orderRouter);

app.use((req, res) => {
  res.status(404).json('Not Found');
});

app.listen(port); // , () => console.log(`Example app listening on port ${port}!`));

export default app;
