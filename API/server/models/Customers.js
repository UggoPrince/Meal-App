/* eslint-disable linebreak-style */
import { sequelize, dataType } from './Sequelizer';

class Customers {
  constructor() {
    this.customer = sequelize.define('customer', {
      id: {
        type: dataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: dataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'firstname is required.' },
        },
      },
      lastname: {
        type: dataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'lastname is required.' },
        },
      },
      address: {
        type: dataType.STRING,
      },
      phone: {
        type: dataType.STRING,
      },
      email: {
        type: dataType.STRING,
        unique: { args: true, msg: 'This email is already registered. Login.' },
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email.',
          },
        },
      },
      password: {
        type: dataType.STRING,
        allowNull: false,
        validate: {
          is: {
            args: ['^[A-Za-z0-9@_]*$', 'i'],
            msg: 'Password must be leters, numbers, underscore and/or @ symbol.',
          },
          len: {
            args: [8, 20],
            msg: 'Password must be between 8 and 20 characters.',
          },
        },
      },
    });
  }

  getCustomer() {
    return this.customer;
  }

  associationWithCaterer(model, newModel) {
    this.customer.belongsToMany(model, { through: newModel });
  }
}

export default new Customers();
