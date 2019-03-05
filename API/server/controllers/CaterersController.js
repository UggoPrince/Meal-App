/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import caterersService from '../services/CaterersService';
import getErrorMessage from '../helpers/allHelpers';

class CaterersController {
  async getCaterer(req, res) {
    const cust = await caterersService.login(req.body);
    if (cust.count === 0) {
      res.status(404).send(['Invalid Caterer email and/or password. Simply Register.']);
    } else {
      res.status(200).send(cust.rows);
    }
  }

  async addCaterer(req, res) {
    const cust = await caterersService.register(req.body);
    if (cust.errors) {
      const err = getErrorMessage(cust.errors);
      res.status(404).send(err);
    } else {
      res.status(201).send(cust);
    }
  }
}

export default new CaterersController();
