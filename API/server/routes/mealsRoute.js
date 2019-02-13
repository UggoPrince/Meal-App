/* eslint-disable linebreak-style */
/* eslint-disable no-console */

import express from 'express';
import mealsController from '../controllers/MealsController';

const Router = express.Router();
Router.get('/meals', mealsController.getMeals);

export default Router;
