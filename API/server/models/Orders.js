/* eslint-disable linebreak-style */
import { sequelize, dataType } from './Sequelizer';

class Orders {
  constructor() {
    this.order = sequelize.define('orders', {
      id: {
        type: dataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    });
  }

  getOrder() {
    return this.order;
  }

  association(model) {
    this.order.belongsTo(model, { foreignKey: { allowNull: false } });
  }
}

export default new Orders();
