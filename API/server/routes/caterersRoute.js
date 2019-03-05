/* eslint-disable linebreak-style */

import express from 'express';
import caterersController from '../controllers/CaterersController';

const Router = express.Router();
Router.post('/caterers/auth/login', caterersController.getCaterer);
Router.post('/caterers/auth/signup', caterersController.addCaterer);

export default Router;
