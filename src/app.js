import express from 'express';

import database from './db';
import dotenv from 'dotenv';
import router from './api/v1/routes';

const app = express();
dotenv.config();

app.use(router);

app.listen(() => {
  console.log('Server running on port %d', process.env.PORT || 3000);
});
