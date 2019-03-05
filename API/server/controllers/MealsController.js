/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */

import mealsService from '../services/MealsService';
import getErrorMessage from '../helpers/allHelpers';

class MealsController {
  async getMeals(req, res) {
    const meals = await mealsService.getAllMeals();
    /* if (meals.errors) {
      res.status(400).send(meals.errors);
    } */
    if (meals.count === 0) {
      res.status(200).send(['No meals yets. Add a meal.']);
    } else {
      res.status(200).send(meals);
    }
  }

  async addMeal(req, res) {
    const addedMeal = await mealsService.add(req.body);
    if (addedMeal.errors) {
      const err = getErrorMessage(addedMeal.errors);
      res.status(400).send(err);
    } else if (addedMeal.name === 'SequelizeForeignKeyConstraintError') {
      res.status(400).send([addedMeal.original.detail]);
    } else {
      res.status(201).send(addedMeal);
    }
  }

  async modifyMeal(req, res) {
    const mealId = req.params.id;
    const modMeal = await mealsService.modify(req.body, mealId);
    if (modMeal[0] === 0 || modMeal.name === 'SequelizeDatabaseError') {
      res.status(404).send(['Invalid meal id.']);
    } else if (modMeal.errors) {
      const err = getErrorMessage(modMeal.errors);
      res.status(400).send(err);
    } else {
      res.status(200).send(modMeal);
    }
  }

  async deleteMeal(req, res) {
    const mealId = req.params.id;
    const delMeal = await mealsService.delete(mealId);

    if (delMeal.name === 'SequelizeDatabaseError' || delMeal === 0) {
      res.status(404).send(['Invalid meal id.']);
    } else {
      res.status(200).send(['Meal successfully deleted.']);
    }
  }
}

export default new MealsController();
