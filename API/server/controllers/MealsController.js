/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import mealsService from '../services/MealsService';
import getErrorMessage from '../helpers/allHelpers';
import JWT from '../helpers/JWT';

class MealsController {
  async getMeals(req, res) {
    const sentToken = req.get('Authorization');

    if (sentToken) {
      const jwt = await JWT.verifyToken(sentToken);
      if (!jwt.tokenExp && jwt.decode.role === 'caterer') {
        const meals = await mealsService.getAllMeals();
        if (meals.count === 0) {
          res.status(200).send(['No meals yets. Add a meal.']);
        } else {
          res.status(200).send(meals);
        }
      } else {
        res.status(401).send(['Session expired. Login as a Caterer to get meals.']);
      }
    } else {
      res.status(401).send(['No Authorization header sent. Login and send a token.']);
    }
  }

  async addMeal(req, res) {
    const sentToken = req.get('Authorization');
    if (sentToken) {
      const jwt = await JWT.verifyToken(sentToken);
      if (!jwt.tokenExp && jwt.decode.role === 'caterer') {
        const reqBody = {
          name: req.body.name,
          size: req.body.size,
          price: req.body.price,
          currency: req.body.currency,
          catererId: jwt.decode.data.id,
        };
        const addedMeal = await mealsService.add(reqBody);
        if (addedMeal.errors) {
          const err = getErrorMessage(addedMeal.errors);
          res.status(400).send(err);
        } else {
          res.status(201).send(addedMeal);
        }
      } else {
        res.status(401).send(['Session expired. Login as a Caterer to add meals.']);
      }
    } else {
      res.status(401).send(['No Authorization header sent. Login and send a token.']);
    }
  }

  async modifyMeal(req, res) {
    const sentToken = req.get('Authorization');
    if (sentToken) {
      const jwt = await JWT.verifyToken(sentToken);
      if (!jwt.tokenExp && jwt.decode.role === 'caterer') {
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
      } else {
        res.status(401).send(['Session expired. Login as a Caterer to update meals.']);
      }
    } else {
      res.status(401).send(['No Authorization header sent. Login and send a token.']);
    }
  }

  async deleteMeal(req, res) {
    const sentToken = req.get('Authorization');
    if (sentToken) {
      const jwt = await JWT.verifyToken(sentToken);
      if (!jwt.tokenExp && jwt.decode.role === 'caterer') {
        const mealId = req.params.id;
        const delMeal = await mealsService.delete(mealId);

        if (delMeal.name === 'SequelizeDatabaseError' || delMeal === 0) {
          res.status(404).send(['Invalid meal id.']);
        } else {
          res.status(200).send(['Meal successfully deleted.']);
        }
      } else {
        res.status(401).send(['Session expired. Login as Caterer to update meals.']);
      }
    } else {
      res.status(401).send(['No Authorization header sent. Login and send a token.']);
    }
  }
}

export default new MealsController();
