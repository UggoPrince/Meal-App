/* eslint-disable linebreak-style */
import sequel from './Sequelizer';
import Caterer from './Caterers';

const sequelize = sequel.sequelizer;
const dataType = sequel.Sequelize;

class Customer {
  constructor() {
    this.customer = sequelize.define('customer', {
      id: {
        type: dataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: dataType.STRING,
        validate: {
          isNull: false,
          max: 50,
        },
      },
      lastname: {
        type: dataType.STRING,
        validate: {
          isNull: false,
          max: 50,
        },
      },
      email: {
        type: dataType.STRING,
        unique: true,
        validate: {
          isNull: false,
          isEmail: true,
        },
      },
      password: {
        type: dataType.STRING,
        validate: {
          isNull: false,
          is: ['^[A-Za-z0-9@_]*$', 'i'],
          isAlphanumeric: true,
          min: 8,
        },
      },
    });
  }

  getCustomer() {
    return this.customer;
  }

  associationWithCaterer(model) {
    this.customer.belongsToMany(model);
  }

  login() {}

  Register() {}
}

export default new Customer();
