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
      + '<h1>Welcome to Meal-Booking-App api</h1>'
      + '<h3>Follow this <a href="https://app.swaggerhub.com/apis-docs/uggo/meal-booking-api/1.0.0" target="blank" style="text-decoration:none;color:#2581DC;">Documentation</a> to consume this API.</h3>'
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
