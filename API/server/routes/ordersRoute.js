/* eslint-disable linebreak-style */
/* eslint-disable no-console */

import express from 'express';
import orderController from '../controllers/OrdersController';

const Router = express.Router();
Router.post('/orders', orderController.addOrder);

export default Router;
