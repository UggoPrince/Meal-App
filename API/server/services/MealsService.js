/* eslint-disable linebreak-style */
import { meals } from '../models/index';

class MealService {
  constructor() {
    this.meals = meals;
  }

  async getAllMeals() {
    try {
      const result = await this.meals.findAndCountAll();
      return result;
    } catch (error) {
      return error;
    }
  }

  async getMealById(mealId) {
    try {
      const result = await this.meals.findAndCountAll({
        where: { id: mealId },
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  async add(mealData) {
    try {
      const result = await this.meals.create(mealData);
      return result;
    } catch (error) {
      return error;
    }
  }

  async modify(mealData, mealId) {
    try {
      const result = await this.meals.update(
        mealData, { returning: true, where: { id: mealId } },
      );
      return result;
    } catch (error) {
      return error;
    }
  }

  async delete(mealId) {
    try {
      const m = await this.meals.destroy({
        where: { id: mealId },
      });
      return m;
    } catch (error) {
      return error;
    }
  }
}

export default new MealService();
