/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import express from 'express';
import mealsRouter from './server/routes/mealsRoute';

const app = express();
const port = process.env.PORT;

app.use('/api/v1', mealsRouter);

app.use((req, res) => {
  res.status(404).json('Not Found');
});

app.listen(port); // , () => console.log(`Example app listening on port ${port}!`));

export default app;
