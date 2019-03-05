/* eslint-disable linebreak-style */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config();

class Sequelizer {
  constructor() {
    this.sequel = new Sequelize(
      process.env.DATABASE,
      process.env.DATABASE_USER,
      process.env.DATABASE_PASSWORD, {
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
