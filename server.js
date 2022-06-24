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
function Forcast(weatherObject){
  //constructer(weatherObject){
  this.date = weatherObject.datetime;
  this.description = weatherObject.weather.description;
  //}
}

//request and map through the data
// app.get('/weather', (request, response) => {
//   const searchQuery = request.query.searchQuery;
//   console.log(searchQuery);
//   let searchResult = weather.find(object => object.city_name.toLowerCase() === searchQuery.toLowerCase());
//   console.log(searchResult);
//   const result = searchResult.data.map(dayObj => new Forcast(dayObj));
//   console.log(result);
//   response.status(200).send(result);
// });

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




//app.get('*', (request, response) => {
//response.send('Hello there!');
//});

//class Weather  {
//constructor()
//}


app.listen(PORT, () => console.log(`listening on port ${PORT}`));

