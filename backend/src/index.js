const express = require('express');
const errorHandler = require('./errorHandler');
require('express-async-errors');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorHandler);

app.listen(3333, () => {
  console.log('Server started at http://localhost:3333');
});
