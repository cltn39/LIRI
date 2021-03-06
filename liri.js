//require packages
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");

//grab keywords from command lines
var commands = process.argv[2];
var query = process.argv.slice(3).join(" ");
var fullCommand = commands + " " + query + ": ";

// spotify key
var spotify = new Spotify(keys.spotify);

// switch function for commands
switch (commands) {
  case "concert-this":
    writeLog(fullCommand);
    // concertThis();
    concertThis();
    var output = concertThis;
    writeLog(output);
    break;

  case "spotify-this-song":
    spotifyThisSong();
    break;
  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}
// write the data into log.txt
function writeLog(input) {
  fs.appendFile("log.txt", " " + input, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

// node liri.js concert-this <artist/band name here>
function concertThis() {
  axios.get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp").then(
    function read(response) {
      //Name of the venue
      console.log("Venue name: " + response.data[0].venue.name);
      //Venue location
      console.log("location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country);
      //Date of the Event (use moment to format this as "MM/DD/YYYY")
      var date = response.data[0].datetime;
      console.log("Date: " + moment(date).format("MM/DD/YYYY"));
    }
  )
}

// node liri.js spotify-this-song '<song name here>'
function spotifyThisSong() {
  spotify.search({ type: 'track', query: query, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    //Artist(s)
    console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
    //The song's name
    console.log("Song title: " + data.tracks.items[0].name);
    //A preview link of the song from Spotify
    console.log("Spotify preview: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
    //The album that the song is from
    console.log("Album title: " + data.tracks.items[0].album.name);
  });
}

// node liri.js movie-this '<movie name here>'
function movieThis() {
  axios.get("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy").then(
    function (response) {
      //* Title of the movie
      console.log("Title: " + response.data.Title);
      //* Year the movie came out
      console.log("Year: " + response.data.Year);
      //* IMDB Rating of the movie.
      console.log("IMDB rating: " + response.data.imdbRating);
      //* Rotten Tomatoes Rating of the movie.
      console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
      //* Country where the movie was produced.
      console.log("Country produced: " + response.data.Released);
      //* Language of the movie.
      console.log("language: " + response.data.Language);
      //* Plot of the movie.
      console.log("plot: " + response.data.Plot);
      //* Actors in the movie.
      console.log("Actors: " + response.data.Actors);
    }
  );
}

//node liri.js do-what-it-says
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.split(',')

    switch (data[0]) {
      case "concert-this":
        function concertThis() {
          axios.get("https://rest.bandsintown.com/artists/" + data[1] + "/events?app_id=codingbootcamp").then(
            function (response) {
              //Name of the venue
              console.log("Venue name: " + response.data[0].venue.name);
              //Venue location
              console.log("location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country);
              //Date of the Event (use moment to format this as "MM/DD/YYYY")
              var date = response.data[0].datetime;
              console.log("Date: " + moment(date).format("MM/DD/YYYY"));
            }
          )
        }
        concertThis();
        break;

      case "spotify-this-song":
        function spotifyThisSong() {
          spotify.search({ type: 'track', query: data[1], limit: 1 }, function (err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }

            //Artist(s)
            console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
            //The song's name
            console.log("Song title: " + data.tracks.items[0].name);
            //A preview link of the song from Spotify
            console.log("Spotify preview: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
            //The album that the song is from
            console.log("Album title: " + data.tracks.items[0].album.name);
          });
        }
        spotifyThisSong();
        break;

      case "movie-this":
        function movieThis() {
          axios.get("http://www.omdbapi.com/?t=" + data[1] + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
              //* Title of the movie
              console.log("Title: " + response.data.Title);
              //* Year the movie came out
              console.log("Year: " + response.data.Year);
              //* IMDB Rating of the movie.
              console.log("IMDB rating: " + response.data.imdbRating);
              //* Rotten Tomatoes Rating of the movie.
              console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
              //* Country where the movie was produced.
              console.log("Country produced: " + response.data.Released);
              //* Language of the movie.
              console.log("language: " + response.data.Language);
              //* Plot of the movie.
              console.log("plot: " + response.data.Plot);
              //* Actors in the movie.
              console.log("Actors: " + response.data.Actors);
            }
          );
        }
        movieThis();
        break;
    }
  });
}