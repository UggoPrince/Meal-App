/* eslint-disable linebreak-style */
import { sequelize, dataType } from './Sequelizer';

class Meals {
  constructor() {
    this.meal = sequelize.define('meal', {
      id: {
        type: dataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: dataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'name is required.' },
        },
      },
      size: {
        type: dataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'size is required.' },
        },
      },
      price: {
        type: dataType.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            args: true,
            msg: 'price must be numeric',
          },
          notEmpty: { msg: 'price is required.' },
        },
      },
      currency: {
        type: dataType.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            arg: true,
            msg: 'currency must be letters.',
          },
          notEmpty: { msg: 'currency is required.' },
        },
      },
    });
  }

  getMeal() {
    return this.meal;
  }

  associationWithCaterer(model) {
    this.meal.belongsTo(model, { foreignKey: { allowNull: false } });
  }
}

export default new Meals();
