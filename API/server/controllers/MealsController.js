/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import MealsService from '../services/MealsService';
import helpers from '../helpers/allHelpers';

const mealsService = new MealsService();

class MealsController {
  getMeals(req, res) {
    res.status(200).send(mealsService.getAll());
  }

  addMeal(req, res) {
    const {
      name, size, price, currency, caterer,
    } = req.body;
    if (!name && !size && !price && !currency && !caterer) {
      res.status(200).send({ message: 'error', error: 'No meal was sent.' });
    } else if (!name) {
      res.status(200).send({ message: 'error', error: 'No meal (name) was sent.' });
    } else if (!size) {
      res.status(200).send({ message: 'error', error: 'No meal (size) was sent.' });
    } else if (!price) {
      res.status(200).send({ message: 'error', error: 'No meal (price) was sent.' });
    } else if (!currency) {
      res.status(200).send({ message: 'error', error: 'No meal (currency) was sent.' });
    } else if (!caterer) {
      res.status(200).send({ message: 'error', error: 'No catererId (caterer) was sent.' });
    } else {
      const addedMeal = mealsService.add(name, size, price, currency, caterer);
      res.status(200).send({ message: 'success', body: addedMeal });
    }
  }

  modifyMeal(req, res) {
    const mealId = parseInt(req.params.id, 10);
    const mealName = req.body.name;
    const mealPrice = req.body.price;
    const mealExist = mealsService.mealExist(mealId);

    if (helpers.validID(mealId) && mealExist.true) {
      if (!helpers.canModifyMeal(mealName, mealPrice)) {
        res.status(200).send({
          message: 'error',
          error: 'No data for the name and/or price update of meal was submitted',
        });
      } else {
        const modifiedMeal = mealsService.modify(mealExist.index, mealName, mealPrice);
        res.status(200).send({ message: 'success', body: modifiedMeal });
      }
    } else {
      res.status(200).send({ message: 'error', error: 'invalid ID' });
    }
  }

  deleteMeal(req, res) {
    const mealId = parseInt(req.params.id, 10);
    const mealExist = mealsService.mealExist(mealId);

    if (helpers.validID(mealId) && mealExist.true) {
      const deletedMeal = mealsService.delete(mealExist.index);
      res.status(200).send({ message: 'success', body: deletedMeal });
    } else {
      res.status(200).send({ message: 'error', error: 'invalid ID' });
    }
  }
}

export default new MealsController();
