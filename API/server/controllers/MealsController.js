/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import MealsService from '../services/MealsService';

const mealsService = new MealsService();

class MealsController {
  getMeals(req, res) {
    res.status(200).send(mealsService.getAll());
  }
}

export default new MealsController();
