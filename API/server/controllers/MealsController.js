/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import MealsService from '../services/MealsService';

const mealsService = new MealsService();

class MealsController {
  getMeals(req, res) {
    res.status(200).send(mealsService.getAll());
  }

  addMeal(req, res) {
    const {
      name, size, price, currency, caterer,
    } = req.body;

    const addedMeal = mealsService.add(name, size, price, currency, caterer);
    res.status(200).send({ message: 'success', body: addedMeal });
  }
}

export default new MealsController();
