/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import dotenv from 'dotenv';
import { seq } from './server/models/Sequelizer';
import app from './server/index';

dotenv.config();
const port = process.env.PORT || 4000;

seq.createTables(false).then(() => {
  app.listen(port, () => console.log(`App listening on port ${port}!`));
});
