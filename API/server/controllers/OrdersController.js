/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import OrdersService from '../services/OrdersService';
import helpers from '../helpers/allHelpers';

const ordersService = new OrdersService();

class OrdersController {
  addOrder(req, res) {
    const { mealId, customerId, catererId } = req.body;
    if (mealId && customerId && catererId) {
      const milID = parseInt(mealId, 10);
      const custID = parseInt(customerId, 10);
      const catID = parseInt(catererId, 10);

      if (!helpers.validID(milID)) {
        res.status(200).send({ message: 'error', error: `meal id [${mealId}] is not valid.` });
      } else if (!helpers.validID(custID)) {
        res.status(200).send({ message: 'error', error: `customer id [${customerId}] is not valid.` });
      } else if (!helpers.validID(catID)) {
        res.status(200).send({ message: 'error', error: `caterer id [${catererId}] is not valid.` });
      } else {
        const addedOrder = ordersService.add(milID, custID, catID, Date.now());
        res.status(200).send({ message: 'success', body: addedOrder });
      }
    } else if (!mealId && !customerId && !catererId) {
      res.status(200).send({ message: 'error', error: 'No mealId, customerId and catererId was sent' });
    } else if (!mealId) {
      res.status(200).send({ message: 'error', error: 'No mealId was sent!' });
    } else if (!customerId) {
      res.status(200).send({ message: 'error', error: 'No customerId was sent!' });
    } else if (!catererId) {
      res.status(200).send({ message: 'error', error: 'No catererId was sent!' });
    }
  }

  modifyOrder(req, res) {
    const mealID = req.body.mealId;
    const orderID = parseInt(req.params.id, 10);
    const orderIdNum = helpers.validID(orderID);
    if (orderIdNum) {
      if (mealID) {
        const milId = parseInt(mealID, 10);
        if (!helpers.validID(milId)) {
          res.status(200).send({ message: 'error', error: 'invalid meal id' });
        } else {
          const orderIdExist = ordersService.orderIdExist(orderID);
          if (orderIdExist.exist) {
            const modifiedOrder = ordersService.modify(orderIdExist.index, milId);
            res.status(200).send({ message: 'success', body: modifiedOrder });
          } else {
            res.status(200).send({ message: 'error', error: `No order with the id [${orderID}]` });
          }
        }
      } else {
        res.status(200).send({ message: 'error', error: 'no meal id was sent.' });
      }
    } else {
      res.status(200).send({ message: 'error', error: 'Invalid Order id.' });
    }
  }
}

export default new OrdersController();
