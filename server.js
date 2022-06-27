'use strict';


// Requirements
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
//const axios = require('axios');

// Require Modules
const getMovies = require('./modules/movies.js');
const getWeather = require('./modules/weather.js');

// USE
app.use(cors());
const PORT = process.env.PORT || 3002;

// Proof of life Test
app.get('/', (req, res) => {
  res.status(200).send('Hello!!');
});

// Route weather
app.get('/weather', getWeather);
// Route movies
app.get('/movies', getMovies);


//error message
app.get('*', (req, res) => {
  res.status.send('Sorry not working!');
});



app.listen(PORT, () => console.log(`listening on port ${PORT}`));

