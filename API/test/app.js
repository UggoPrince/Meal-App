/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import dotenv from 'dotenv';
import app from '../server/index';

dotenv.config();
const port = process.env.PORT || 4000;

app.listen(port);

export default app;
