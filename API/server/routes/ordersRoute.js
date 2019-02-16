/* eslint-disable linebreak-style */
/* eslint-disable no-console */

import express from 'express';
import ordersController from '../controllers/OrdersController';

const Router = express.Router();
Router.post('/orders', ordersController.addOrder);
Router.put('/orders/:id', ordersController.modifyOrder);

export default Router;
