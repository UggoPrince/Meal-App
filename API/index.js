/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mealsRouter from './server/routes/mealsRoute';
import menuRouter from './server/routes/menuRoute';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', mealsRouter);
app.use('/api/v1', menuRouter);

app.use((req, res) => {
  res.status(404).json('Not Found');
});

app.listen(port); // , () => console.log(`Example app listening on port ${port}!`));

export default app;
