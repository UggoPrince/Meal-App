/* eslint-disable linebreak-style */
/* eslint-disable no-console */

import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config();

class Sequelizer {
  constructor() {
    this.sequel = new Sequelize(
      'dfietbbbsu1pub',
      'lcgmatquxeupai',
      '586b19a0984f0fcaa10f440433cac7e7ad33cb66e5283a8e4815085d1c6dedea', {
        host: 'ec2-174-129-236-21.compute-1.amazonaws.com',
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
