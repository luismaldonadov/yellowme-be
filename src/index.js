const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log('Server running on port %d', process.env.PORT || 3000);
});
