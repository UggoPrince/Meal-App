/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import customersService from '../services/CustomersService';
import getErrorMessage from '../helpers/allHelpers';
import JWT from '../helpers/JWT';

class CustomersController {
  async getCustomer(req, res) {
    /* const sentToken = req.get('Authorization');
    let jwt = '';

    if (sentToken) {
      jwt = await JWT.verifyToken(sentToken);
    } else jwt = 'no token'; */

    // if (jwt === 'no token' || jwt.tokenExp) {
    const cust = await customersService.login(req.body);
    if (cust.count === 0) {
      res.status(404).send(['Invalid Customer email and/or password. Simply Register.']);
    } else {
      const token = JWT.signToken({ data: cust.rows[0], role: 'customer' });
      res.status(200).send({ token });
    }
    /* } else {
      res.status(200).send({ token: sentToken });
    } */
  }

  async addCustomer(req, res) {
    const cust = await customersService.register(req.body);
    if (cust.errors) {
      const err = getErrorMessage(cust.errors);
      res.status(404).send(err);
    } else {
      const token = JWT.signToken({ data: cust, role: 'customer' });
      res.status(201).send({ token });
    }
  }
}

export default new CustomersController();
