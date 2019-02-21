/* eslint-disable linebreak-style */
import sequel from './Sequelizer';
import Customers from './Customers';

const sequelize = sequel.sequelizer;
const dataType = sequel.Sequelize;

class Caterer {
  constructor() {
    this.caterer = sequelize.define('caterer', {
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
      restaurant: {
        type: dataType.STRING,
        validate: {
          isNull: false,
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

  getCaterer() {
    return this.caterer;
  }

  associationWithCustomer(model) {
    this.caterer.belongsToMany(model);
  }
}

export default new Caterer();
