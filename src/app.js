import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.listen(() => {
  console.log('Server running on port %d', process.env.PORT || 3000);
});
