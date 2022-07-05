'use strict';

//let cache = require('./cache.js');
const axios = require('axios');

async function getWeather(req,res) {
  try {
    let lat = req.query.latResult;
    let lon = req.query.lonResult;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
    //console.log(url);
    let results = await axios.get(url);
    console.log(results.data.data);
    let weatherResults = results.data.data.map(day => new Forecast(day));
    console.log(weatherResults[0].datetime);
    res.status(200).send(results.data.data);

  } catch (error) {
    res.status(500).send(`Enountered an error: ${error.status}. ${error.message}`);

  }
}

class Forecast {
  constructer(ForecastObj) {
    this.time = ForecastObj.datetime;
    this.forecast = ForecastObj.weather.description;

  }
}



module.exports = getWeather;
