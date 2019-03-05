/* eslint-disable linebreak-style */
import { caterers } from '../models/index';

class CaterersService {
  constructor() {
    this.caterer = caterers;
  }

  async login(catererData) {
    try {
      const result = await this.caterer.findAndCountAll({
        where: { email: catererData.email, password: catererData.password },
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  async getCatererById(catererId) {
    try {
      const result = await this.caterer.findAll({
        where: { id: catererId },
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  async register(catererData) {
    try {
      const result = await this.caterer.create(catererData);
      return result;
    } catch (error) {
      return error;
    }
  }
}

export default new CaterersService();
