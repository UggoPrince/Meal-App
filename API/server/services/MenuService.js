/* eslint-disable linebreak-style */
import { menu } from '../models/index';
import mealsService from './MealsService';

class MenuService {
  constructor() {
    this.menu = menu;
  }

  async getAllMenus() {
    try {
      const result = await this.menu.findAndCountAll();
      return result;
    } catch (error) {
      return error;
    }
  }

  async add(menuData) {
    try {
      const result = await this.menu.create(menuData);
      const meal = [];
      for (let i = 0; i < result.mealId.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        meal[i] = await mealsService.getMealById(result.mealId[i]);
      }
      return [{ menu: result }, { meals: meal }];
    } catch (error) {
      return error;
    }
  }
}

export default new MenuService();
