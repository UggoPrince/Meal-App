/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import 'babel-polyfill';
import dotenv from 'dotenv';
import { seq } from './server/models/Sequelizer';
import app from './server/index';

dotenv.config();
const port = process.env.PORT || 4000;

seq.createTables(false).then(() => {
  app.listen(port, () => console.log(`App listening on port ${port}!`));
});
