/* eslint-disable linebreak-style */
/* eslint-disable no-console */

import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config();

class Sequelizer {
  constructor() {
    this.sequel = new Sequelize(
      process.env.DATABASE_URL + process.env.DATABASE, {
        host: 'localhost',
        dialect: 'postgres',
        operatorsAliases: false,
      },
    );
    this.Sequelize = Sequelize;
  }

  getSequelizer() {
    return this.sequel;
  }

  async createTables(truthy) {
    await this.sequel.sync({ force: truthy });
  }
}

export const seq = new Sequelizer();
export const sequelize = seq.getSequelizer();
export const dataType = seq.Sequelize;
