/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import ordersService from '../services/OrdersService';
import mealsService from '../services/MealsService';
import JWT from '../helpers/JWT';

class OrdersController {
  async addOrder(req, res) {
    const sentToken = req.get('Authorization');
    if (sentToken) {
      const jwt = await JWT.verifyToken(sentToken);
      if (!jwt.tokenExp && jwt.decode.role === 'customer') {
        const mealID = req.body.mealId;
        const meal = await mealsService.getMealById(mealID);
        if (meal.count === 0 || meal.name === 'SequelizeDatabaseError') {
          res.status(404).send([`No meal with mealId ${mealID}.`]);
        } else {
          const catId = meal.rows[0].catererId;
          const reqBody = {
            mealId: mealID,
            catererId: catId,
            customerId: jwt.decode.data.id,
          };
          const addedOrder = await ordersService.add(reqBody);
          res.status(201).send(addedOrder);
        }
      } else {
        res.status(401).send(['Session expired. Login as a Customer to make an orders.']);
      }
    } else {
      res.status(401).send(['No Authorization header sent. Login as a Customer and send a token.']);
    }
  }

  async modifyOrder(req, res) {
    const sentToken = req.get('Authorization');
    if (sentToken) {
      const jwt = await JWT.verifyToken(sentToken);
      if (!jwt.tokenExp && jwt.decode.role === 'customer') {
        const orderID = req.params.id;
        const mealID = req.body.mealId;
        const modOrder = await ordersService.modify(orderID, mealID, jwt.decode.data.id);
        if (modOrder[0] === 0) {
          res.status(404).send(['Invalid orderId.']);
        } else if (modOrder.name === 'SequelizeDatabaseError') {
          res.status(404).send(['Invalid mealId/orderId.']);
        } else {
          res.status(200).send(modOrder);
        }
      } else {
        res.status(401).send(['Session expired. Login as a Customer to modify your orders.']);
      }
    } else {
      res.status(401).send(['No Authorization header sent. Login as a Customer and send a token.']);
    }
  }

  async getOrders(req, res) {
    const sentToken = req.get('Authorization');
    if (sentToken) {
      const jwt = await JWT.verifyToken(sentToken);
      if (!jwt.tokenExp && jwt.decode.role === 'caterer') {
        const allOrders = await ordersService.getAllOrders(jwt.decode.data.id);
        if (allOrders.count === 0) {
          res.status(200).send(['Your Customers have made no order(s).']);
        } else {
          res.status(200).send(allOrders);
        }
      } else {
        res.status(401).send(['Session expired. Login as a Caterer to view orders.']);
      }
    } else {
      res.status(401).send(['No Authorization header sent. Login as a Caterer and send a token.']);
    }
  }
}

export default new OrdersController();
