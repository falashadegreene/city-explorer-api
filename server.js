'use strict';



require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

//const { response } = require('express');
//const weather = require('./data/weather.json');
const getMovies = require('./modules/movies.js');
const getWeather = require('./modules/weather.js');

app.use(cors());



const PORT = process.env.PORT || 3002;
//constructer

app.get('/weather', getWeather);



app.get('/movies', getMovies);





//function getMovies(req, res)





app.listen(PORT, () => console.log(`listening on port ${PORT}`));

