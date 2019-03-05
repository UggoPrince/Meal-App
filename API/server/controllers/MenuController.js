/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */

import menuService from '../services/MenuService';
import mealsService from '../services/MealsService';
import getErrorMessage from '../helpers/allHelpers';

class MenuController {
  async addMenu(req, res) {
    const meals = req.body.mealId;

    let mealNO = false;
    const errMes = [];
    if (meals) {
      for (let i = 0; i < meals.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
        const mealExist = await mealsService.getMealById(meals[i]);
        if (mealExist.count === 0) {
          mealNO = true;
          errMes.push(`meal id ${meals[i]} is invalid.`);
        }
      }
    }

    if (mealNO) res.status(404).send(errMes);
    else {
      const addedMenu = await menuService.add(req.body);

      if (addedMenu.errors) {
        const err = getErrorMessage(addedMenu.errors);
        res.status(400).send(err);
      } else if (addedMenu.name === 'SequelizeDatabaseError') {
        res.status(400).send(['A meal id is invalid.']);
      } else if (addedMenu.name === 'SequelizeForeignKeyConstraintError') {
        res.status(400).send([addedMenu.original.detail]);
      } else {
        res.status(201).send(addedMenu);
      }
    }
  }

  async getMenu(req, res) {
    const menu = await menuService.getAllMenus();
    if (menu.count === 0) {
      res.status(200).send(['No menu available. Add one.']);
    } else {
      res.status(200).send(menu);
    }
  }
}

export default new MenuController();
