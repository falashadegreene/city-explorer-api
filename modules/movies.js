'use  strict';

const axios = require('axios');

async function getMovies(req, res) {
  try {
    let searchQuery = req.query.searchQuery;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
    console.log(url);
    let movieResult = await axios.get(url);
    console.log(movieResult.data.results);
    let movieArray = movieResult.data.results.map(movie => new Movie(movie));
    console.log(movieArray[0].title);
    //res.send('hello');
    res.status(200).send(movieResult.data);

  }
  catch (error) {
    res.status(500).send(`uh oh! error: ${error.status}. ${error.message}`);
  }
}

class Movie {
  constructor(movieObj){
    this.title = movieObj.title;
    this.desciption = movieObj.overview;
  }
}

module.exports = getMovies;
