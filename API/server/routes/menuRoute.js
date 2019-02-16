/* eslint-disable linebreak-style */
/* eslint-disable no-console */

import express from 'express';
import menuController from '../controllers/MenuController';

const Router = express.Router();
Router.post('/menu', menuController.addMenu);

export default Router;
