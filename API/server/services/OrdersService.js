/* eslint-disable linebreak-style */
/* eslint-disable no-console */

import Orders from '../models/Orders';

class OrdersService {
  constructor() {
    this.Orders = [];
  }

  getAllOrders() {
    return this.Orders.map((data) => {
      const order = new Orders();
      order.id = data.id;
      order.meal_id = data.meal_id;
      order.customer_id = data.customer_id;
      order.caterer_id = data.caterer_id;
      order.created_at = data.created_at;
      return order;
    });
  }

  add(mealID, custID, catID, date) {
    const totalOrders = this.Orders.length;
    const orderId = totalOrders + 1;
    const orderIndex = orderId - 1;
    const order = {
      id: orderId,
      meal_id: mealID,
      customer_id: custID,
      caterer_id: catID,
      created_id: date,
    };
    this.Orders.push(order);
    return this.getAllOrders()[orderIndex];
  }
}

export default OrdersService;
