/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import caterersService from '../services/CaterersService';
import getErrorMessage from '../helpers/allHelpers';
import JWT from '../helpers/JWT';

class CaterersController {
  async getCaterer(req, res) {
    const cat = await caterersService.login(req.body);
    if (cat.count === 0) {
      res.status(404).send(['Invalid Caterer email and/or password. Simply Register.']);
    } else {
      const token = JWT.signToken({ data: cat.rows[0], role: 'caterer' });
      res.status(200).send({ token });
    }
  }

  async addCaterer(req, res) {
    const cat = await caterersService.register(req.body);
    if (cat.errors) {
      const err = getErrorMessage(cat.errors);
      res.status(404).send(err);
    } else {
      const token = JWT.signToken({ data: cat, role: 'caterer' });
      res.status(201).send({ token });
    }
  }
}

export default new CaterersController();
