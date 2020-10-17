import express from 'express';

import bodyParser from 'body-parser';
import database from './db';
import dotenv from 'dotenv';
import routes from './api/v1/routes';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(routes);

module.exports = app;
