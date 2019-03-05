/* eslint-disable linebreak-style */

import express from 'express';
import mealsController from '../controllers/MealsController';

const Router = express.Router();
Router.get('/meals', mealsController.getMeals);
Router.post('/meals', mealsController.addMeal);
Router.put('/meals/:id', mealsController.modifyMeal);
Router.delete('/meals/:id', mealsController.deleteMeal);

export default Router;
