import express from 'express';

const app = express();

app.listen(() => {
  console.log('Server running on port %d', process.env.PORT || 3000);
});
