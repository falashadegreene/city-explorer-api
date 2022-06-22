'use strict';

console.log('our first server');

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');

//const cors = require('cors');


const app = express();
//app.use(cors());


const PORT = process.env.PORT || 3002;




app.get('/', (request, response) => {
  response.send('hello from our server!');
})

app.get('/hello', (request, response) => {
  console.log(request.query.name);
  let name = request.query.name;
  let lastName = request.query.lastName;
  // let fullName = `${name} ${lastName}`;
  response.send(`Hello ${name} ${lastName}!`);
});

app.get('/weather', (request, response) => {
  try {
    let weatherFromRequest = request.query.weather;
    console.log(weatherFromRequest);
    let dataToSearch = data.find(search => search.weather === weatherFromRequest);
    let dataToSend = new Pet(dataToGroom);
    response.send(dataToSend);
  } catch (error) {
   
    next(error);
    
  }
});

app.get('*', (request, response) => {
  response.send('The thing you are looking for doesn\'t exist');
});


  //class {
  //constructor(petObject) {
    //this.name = petObject.name;
    //this.breed = petObject.breed;
  //}
}


app.use((error, request, response, next) => {
  response.status(500).send(error.message);
}) 



app.listen(PORT, () => console.log(`listening on port ${PORT}`));

