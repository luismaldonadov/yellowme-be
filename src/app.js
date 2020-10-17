const express = require('express');

const bodyParser = require('body-parser');
const database = require('db');
const dotenv = require('dotenv');
const routes = require('api/v1/routes');

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
