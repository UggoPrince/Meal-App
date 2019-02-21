/* eslint-disable linebreak-style */

import Sequelize from 'sequelize';

class Sequelizer {
  constructor() {
    this.sequelize = new Sequelize(
      process.env.DATABASE,
      process.env.DATABASE_USER,
      process.env.DATABASE_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres',
      },
    );
  }

  getSequelizer() {
    return this.sequelize;
  }
}

const sequelizer = new Sequelizer().getSequelizer();

export default { sequelizer, Sequelize };
