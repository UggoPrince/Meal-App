/* eslint-disable linebreak-style */

import express from 'express';
import customersController from '../controllers/CustomersController';

const Router = express.Router();
Router.post('/customers/auth/login', customersController.getCustomer);
Router.post('/customers/auth/signup', customersController.addCustomer);

export default Router;
