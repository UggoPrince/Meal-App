/* eslint-disable linebreak-style */
import { customers } from '../models/index';

class CustomersService {
  constructor() {
    this.customer = customers;
  }

  async login(custData) {
    try {
      const result = await this.customer.findAndCountAll({
        where: { email: custData.email, password: custData.password },
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  async register(customerData) {
    try {
      const result = await this.customer.create(customerData);
      return result;
    } catch (error) {
      return error;
    }
  }
}

export default new CustomersService();
