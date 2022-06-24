'use strict';



require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
//const weather = require('./data/weather.json');
app.use(cors());



const PORT = process.env.PORT || 3002;
//constructer
function Forcast(weatherObject) {
  //constructer(weatherObject){
  this.date = weatherObject.datetime;
  this.description = weatherObject.weather.description;
  //}
}

app.get('/weather', async (req, res) => {

  //let searchQueryFrontEnd = req.query.searchQuery;
  try {
    let lat = req.query.latResult;
    let lon = req.query.lonResult;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
    console.log(url);
    let results = await axios.get(url);
    console.log(results);
    let weatherResults = results.data.data.map(dayObj => new Forcast(dayObj));
    console.log(weatherResults);
    res.send(weatherResults);

  } catch (error) {
    res.status(500).send(`Enountered an error: ${error.status}. ${error.message}`);
    //console.log(error);
  }
});

app.get('/movies', async (req, res) => {
  try {
    let url = `https://api.themovieb.org/3/movie550?api_key=${process.env.MOVIE_API_KEY}`;
    let movieResult = await axios.get(url);
    res.status(200).send(movieResult.data);

  }
  catch (error) {
    res.status(500).send(`Encountered and error: ${error.status}. ${error.message}`);
  }
});









app.listen(PORT, () => console.log(`listening on port ${PORT}`));

