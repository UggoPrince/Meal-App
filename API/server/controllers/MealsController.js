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

  modifyMeal(req, res) {
    const mealId = req.params.id;
    const mealName = req.body.name;
    const mealPrice = req.body.price;

    const modifiedMeal = mealsService.modify(mealId, mealName, mealPrice);
    if (modifiedMeal.success) {
      res.status(200).send({ message: 'success', body: modifiedMeal.success });
    } else {
      res.status(200).send({ message: 'error', error: modifiedMeal.error });
    }
  }
}

export default new MealsController();
