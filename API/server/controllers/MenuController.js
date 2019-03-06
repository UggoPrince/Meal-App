/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import menuService from '../services/MenuService';
import mealsService from '../services/MealsService';
import getErrorMessage from '../helpers/allHelpers';
import JWT from '../helpers/JWT';

class MenuController {
  async addMenu(req, res) {
    const sentToken = req.get('Authorization');
    if (sentToken) {
      const jwt = await JWT.verifyToken(sentToken);
      if (!jwt.tokenExp && jwt.decode.role === 'caterer') {
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
          const reqBody = {
            mealId: meals,
            catererId: jwt.decode.data.id,
          };
          const addedMenu = await menuService.add(reqBody);
          if (addedMenu.errors) {
            const err = getErrorMessage(addedMenu.errors);
            res.status(400).send(err);
          } else if (addedMenu.name === 'SequelizeDatabaseError') {
            res.status(400).send(['A meal id is invalid.']);
          } else {
            res.status(201).send(addedMenu);
          }
        }
      } else {
        res.status(401).send(['Session expired. Login as a Caterer to add a Menu.']);
      }
    } else {
      res.status(401).send(['No Authorization header sent. Login and send a token.']);
    }
  }

  async getMenu(req, res) {
    const sentToken = req.get('Authorization');
    if (sentToken) {
      const jwt = await JWT.verifyToken(sentToken);
      if (!jwt.tokenExp) {
        const menu = await menuService.getAllMenus();
        if (menu.count === 0) {
          res.status(200).send(['No menu available. Add one.']);
        } else {
          res.status(200).send(menu);
        }
      } else {
        res.status(401).send(['Session expired. Login to view menus.']);
      }
    } else {
      res.status(401).send(['No Authorization header sent. Login and send a token.']);
    }
  }
}

export default new MenuController();
