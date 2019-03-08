/* eslint-disable linebreak-style */
import { orders } from '../models/index';
import mealsService from './MealsService';
import caterersService from './CaterersService';

class OrdersService {
  constructor() {
    this.orders = orders;
  }

  async getAllOrders(id) {
    try {
      const result = await this.orders.findAndCountAll({
        where: { catererId: id },
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  async getOrderByMealCust(ID, mealID, custID) {
    try {
      const result = await this.orders.findAndCountAll({
        where: { id: ID, mealId: mealID, customerId: custID },
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  /* async orderIdExist(orderId) {
    try {
      const result = await this.orders.findAndCountAll({
        where: { id: orderId },
      });
      return result.count;
    } catch (error) {
      return error;
    }
  } */

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

  async modify(ID, newMealId, custID) {
    try {
      const result = await this.orders.update(
        { mealId: newMealId },
        { returning: true, where: { id: ID, customerId: custID } },
      );
      return result;
    } catch (error) {
      return error;
    }
  }
}

export default new OrdersService();
