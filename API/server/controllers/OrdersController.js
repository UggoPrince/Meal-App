/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import ordersService from '../services/OrdersService';
import getErrorMessage from '../helpers/allHelpers';

class OrdersController {
  async addOrder(req, res) {
    const addedOrder = await ordersService.add(req.body);

    if (addedOrder.errors) {
      const err = getErrorMessage(addedOrder.errors);
      res.status(400).send(err);
    } else if (addedOrder.name === 'SequelizeDatabaseError') {
      res.status(400).send(['An invalid id was sent.']);
    } else if (addedOrder.name === 'SequelizeForeignKeyConstraintError') {
      res.status(404).send([addedOrder.original.detail]);
    } else {
      res.status(201).send(addedOrder);
    }
  }

  async modifyOrder(req, res) {
    const modOrder = await ordersService.modify(req.body.mealId, req.params.id);
    if (modOrder.errors) {
      const err = getErrorMessage(modOrder.errors);
      res.status(400).send(err);
    } else if (modOrder.name === 'SequelizeDatabaseError') {
      res.status(404).send(['Invalid mealId.']);
    } else if (modOrder[0] === 0) {
      res.status(404).send(['Invalid orderId.']);
    } else {
      res.status(200).send(modOrder);
    }
  }

  async getOrders(req, res) {
    const allOrders = await ordersService.getAllOrders();
    if (allOrders.count === 0) {
      res.status(200).send(['No orders available.']);
    } else {
      res.status(200).send(allOrders);
    }
  }
}

export default new OrdersController();
