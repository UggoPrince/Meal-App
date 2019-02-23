/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import MealsService from '../services/MealsService';
import MealsValidation from '../validation/MealsValidation';

const mealsService = new MealsService();

class MealsController {
  getMeals(req, res) {
    res.status(200).send(mealsService.getAll());
  }

  addMeal(req, res) {
    const {
      name, size, price, currency, catererId,
    } = req.body;
    const mealsValid = new MealsValidation();
    const validReqData = mealsValid.validateAddMeal(name, size, price, currency, catererId);
    if (validReqData.error) {
      res.status(404).send({ message: 'error', error: validReqData.invalid });
    } else {
      const addedMeal = mealsService.add(name, size, price, currency, catererId);
      res.status(201).send({ message: 'success', meal: addedMeal });
    }
  }

  modifyMeal(req, res) {
    const mealId = req.params.id;
    const mealName = req.body.name;
    const mealPrice = req.body.price;
    const mealExist = mealsService.mealExist(parseInt(mealId, 10));
    const mealsValid = new MealsValidation();
    const validReqData = mealsValid.validateModifyMeal(mealId, mealName, mealPrice);

    if (validReqData.error) {
      res.status(404).send({ message: 'error', error: validReqData.invalid });
    } else if (mealExist.exist === false) {
      res.status(404).send({ message: 'error', error: `No meal with mealId: ${mealId}.` });
    } else {
      const modifiedMeal = mealsService.modify(mealExist.index, mealName, mealPrice);
      res.status(201).send({ message: 'success', body: modifiedMeal });
    }
  }

  deleteMeal(req, res) {
    const mealId = req.params.id;
    const mealExist = mealsService.mealExist(parseInt(mealId, 10));
    const mealsValid = new MealsValidation();
    const validReqData = mealsValid.validateDeleteMeal(mealId);

    if (validReqData.error) {
      res.status(404).send({ message: 'error', error: validReqData.invalid });
    } else if (mealExist.exist === false) {
      res.status(404).send({ message: 'error', error: `No meal with mealId: ${mealId}.` });
    } else {
      const deletedMeal = mealsService.delete(mealExist.index);
      res.status(200).send({ message: 'success', body: deletedMeal });
    }
  }
}

export default new MealsController();
