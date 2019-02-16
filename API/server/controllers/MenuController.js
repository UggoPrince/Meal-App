/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import MenuService from '../services/MenuService';
import helpers from '../helpers/allHelpers';

const menuService = new MenuService();

class MenuController {
  addMenu(req, res) {
    const { mealId, catererId } = req.body;
    if (mealId && catererId) {
      const mealNum = mealId;
      const catID = parseInt(catererId, 10);
      const mNum = mealNum.length;


      if (!mNum && !catererId) {
        res.status(200).send({ message: 'error', error: 'No meal id(s) (mealId) and caterer id (catererId) was sent' });
      }
      if (!mNum && catererId) {
        res.status(200).send({ message: 'error', error: 'No meal id(s) (mealId) was sent!' });
      }
      if (mNum && !catererId) {
        res.status(200).send({ message: 'error', error: 'No caterer id (catererId) was sent!' });
      }

      const validMealId = helpers.menuOptionValid(mealNum);
      if (validMealId.message === 'error') {
        res.status(200).send({ message: 'error', error: `meal id [${validMealId.error}] is not valid.` });
      } else if (!helpers.validID(catID)) {
        res.status(200).send({ message: 'error', error: `caterer id [${catererId}] is not valid.` });
      } else {
        const addedMenu = menuService.add(mealNum, catID, Date.now());
        res.status(200).send({ message: 'success', body: addedMenu });
      }
    } else {
      res.status(200).send({ message: 'error', error: 'No meal id(s) (mealId) and caterer id (catererId) was sent' });
    }
  }
}

export default new MenuController();
