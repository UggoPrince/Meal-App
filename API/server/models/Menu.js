/* eslint-disable linebreak-style */
import { sequelize, dataType } from './Sequelizer';

class Menu {
  constructor() {
    this.menu = sequelize.define('menu', {
      id: {
        type: dataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      mealId: {
        type: dataType.ARRAY(dataType.INTEGER),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'At least on meal id should be provided,' },
        },
      },
    });
  }

  getMenu() {
    return this.menu;
  }

  associationWithCaterer(model) {
    this.menu.belongsTo(model, { foreignKey: { allowNull: false } });
  }
}

export default new Menu();
