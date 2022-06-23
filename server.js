'use strict';



require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const weather = require('./data/weather.json');
app.use(cors());



const PORT = process.env.PORT || 3002;

function Forcast(weatherObject) {
  //constructer(weatherObject){
  this.date = weatherObject.datetime;
  this.description = weatherObject.weather.description;
  //}
}


app.get('/weather', (request, response) => {
  const searchQuery = request.query.searchQuery;
  //console.log(searchQuery);
  let searchResult = weather.find(object => object.city_name.toLowerCase() === searchQuery.toLowerCase());
  //console.log(searchResult);
  const result = searchResult.data.map(dayObj => new Forcast(dayObj));
  console.log(result);
  response.status(200).send(result);
});


app.get('*', (request, response) => {
  response.send('Does Not Compute');
});



app.listen(PORT, () => console.log(`listening on port ${PORT}`));

