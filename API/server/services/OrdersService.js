/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill';
import { orders } from '../models/index';
import mealsService from './MealsService';
import caterersService from './CaterersService';

class OrdersService {
  constructor() {
    this.orders = orders;
  }

  async getAllOrders() {
    try {
      const result = await this.orders.findAndCountAll();
      return result;
    } catch (error) {
      return error;
    }
  }

  async orderIdExist(orderId) {
    try {
      const result = await this.orders.findAndCountAll({
        where: { id: orderId },
      });
      return result.count;
    } catch (error) {
      return error;
    }
  }

  async add(orderData) {
    try {
      const result = await this.orders.create(orderData);
      const meal = await mealsService.getMealById(result.mealId);
      const caterer = await caterersService.getCatererById(result.catererId);
      return [{ order: result }, { meal }, { caterer }];
    } catch (error) {
      return error;
    }
  }

  async modify(newMealId, ordID) {
    try {
      const result = await this.orders.update(
        { mealId: newMealId },
        { returning: true, where: { id: ordID } },
      );
      return result;
    } catch (error) {
      return error;
    }
  }
}

export default new OrdersService();
