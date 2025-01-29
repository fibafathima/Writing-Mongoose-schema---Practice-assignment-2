const express = require('express');
const { resolve } = require('path');
const routes = require('./routes'); // Importing the routes

const app = express();
const port = 3010;

app.use(express.json()); // Middleware to parse JSON requests
app.use(express.static('static'));

app.use('/api', routes); // Using the routes with a base path

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
