/* eslint-disable linebreak-style */
/* eslint-disable no-console */

import Orders from '../models/Orders';

class OrdersService {
  constructor() {
    this.orders = [];
  }

  getAllOrders() {
    return this.orders.map((data) => {
      const order = new Orders();
      order.id = data.id;
      order.meal_id = data.meal_id;
      order.customer_id = data.customer_id;
      order.caterer_id = data.caterer_id;
      order.created_at = data.created_at;
      return order;
    });
  }

  orderIdExist(orderID) {
    if (this.orders.length !== 0) {
      for (let i = 0; i < this.orders.length; i += 1) {
        if (this.orders[i].id === orderID) return { exist: true, index: i };
      }
      return { exist: false };
    }
    return { exist: false };
  }

  add(mealID, custID, catID, date) {
    const totalOrders = this.orders.length;
    const orderId = totalOrders + 1;
    const orderIndex = orderId - 1;
    const order = {
      id: orderId,
      meal_id: mealID,
      customer_id: custID,
      caterer_id: catID,
      created_id: date,
    };
    this.orders.push(order);
    return this.getAllOrders()[orderIndex];
  }

  modify(index, mealId) {
    this.orders[index].meal_id = mealId;
    return this.getAllOrders()[index];
  }
}

export default OrdersService;
