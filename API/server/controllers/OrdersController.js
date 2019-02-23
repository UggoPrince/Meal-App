/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import OrdersService from '../services/OrdersService';
import OrdersValidation from '../validation/OrdersValidation';

const ordersService = new OrdersService();

class OrdersController {
  addOrder(req, res) {
    const { mealId, customerId, catererId } = req.body;
    const ordersValidation = new OrdersValidation();
    const validReqData = ordersValidation.validateAddOrder(mealId, customerId, catererId);
    if (!validReqData.error) {
      const addedOrder = ordersService.add(mealId, customerId, catererId, Date.now());
      res.status(201).send({ message: 'success', order: addedOrder });
    } else {
      res.status(404).send({ message: 'error', error: validReqData.invalid });
    }
  }

  modifyOrder(req, res) {
    const mealID = req.body.mealId;
    const orderId = req.params.id;
    const ordersValidation = new OrdersValidation();
    const validReqData = ordersValidation.validateModifyOrder(mealID, orderId);

    if (!validReqData.error) {
      const orderIdExist = ordersService.orderIdExist(parseInt(orderId, 10));
      if (orderIdExist.exist) {
        const modifiedOrder = ordersService.modify(orderIdExist.index, mealID);
        res.status(201).send({ message: 'success', order: modifiedOrder });
      } else {
        res.status(404).send({ message: 'error', error: `No order with the id [${orderId}]` });
      }
    } else {
      res.status(404).send({ message: 'error', error: validReqData.invalid });
    }
  }

  getOrders(req, res) {
    const totalOrders = ordersService.totalOrders();
    if (totalOrders < 1) {
      res.status(200).send({
        message: 'success',
        error: 'No orders available. You can make one with the field below.',
        fields: 'mealId',
      });
    } else {
      const allOrders = ordersService.getAllOrders();
      res.status(200).send({ message: 'success', orders: allOrders });
    }
  }
}

export default new OrdersController();
