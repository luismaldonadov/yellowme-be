import database from './db';
import dotenv from 'dotenv';
import express from 'express';

const app = express();
dotenv.config();

app.listen(() => {
  console.log('Server running on port %d', process.env.PORT || 3000);
});
