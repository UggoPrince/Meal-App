/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */

import customersService from '../services/CustomersService';
import getErrorMessage from '../helpers/allHelpers';

class CustomersController {
  async getCustomer(req, res) {
    const cust = await customersService.login(req.body);
    if (cust.count === 0) {
      res.status(404).send(['Invalid Customer email and/or password. Simply Register.']);
    } else {
      res.status(200).send(cust.rows);
    }
  }

  async addCustomer(req, res) {
    const cust = await customersService.register(req.body);
    if (cust.errors) {
      const err = getErrorMessage(cust.errors);
      res.status(404).send(err);
    } else {
      res.status(201).send(cust);
    }
  }
}

export default new CustomersController();
