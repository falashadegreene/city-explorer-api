'use strict';

let cache = require('./cache.js');
const axios = require('axios');
require('dotenv').config();

async function getMovies(request, response) {
  let city = request.query.searchQuery;
  let key = 'movie-' + city;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
  if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
    console.log('Cache in!');
  } else {
    console.log('Cache out!');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(url).then(response => parseMovie(response.data));
  }
  console.log(cache[key].data);
  response.send(cache[key].data);
}
function parseMovie(dataToGroom) {
  console.log(dataToGroom);
  try {
    const dataToSend = dataToGroom.results.map(movie => {
      return new Movie(movie);
    });
    return Promise.resolve(dataToSend);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
  }
}

module.exports = getMovies;
