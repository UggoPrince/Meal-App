/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import MenuService from '../services/MenuService';
import MenuValidation from '../validation/MenuValidation';

const menuService = new MenuService();

class MenuController {
  addMenu(req, res) {
    const { mealId, catererId } = req.body;
    const mealNum = mealId;
    const menuValidation = new MenuValidation();
    const validReqData = menuValidation.validateAddMenu(mealNum, catererId);

    if (!validReqData.error) {
      const addedMenu = menuService.add(mealId, catererId, Date.now());
      res.status(201).send({ menu: addedMenu });
    } else {
      res.status(404).send({ message: 'error', error: validReqData.invalid });
    }
  }

  getMenu(req, res) {
    const menuExist = menuService.menuExist();
    if (!menuExist) {
      res.status(200).send({
        message: 'success',
        body: 'No Menu in your account. Set up a Menu now with the following fields below.',
        fields: ' mealId(s) (one or meal id with the same key name [ mealId ]), and catererId (only one!)',
      });
    } else {
      res.status(200).send({ menus: menuService.get() });
    }
  }
}

export default new MenuController();
