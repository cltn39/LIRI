require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var commands= process.argv[2];
var thisSong = process.argv.slice(3).join(" ");

switch (commands) {
  case "concert-this":
    concertThis();
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

function concertThis() {
  console.log("hello")
}

function spotifyThisSong() {
  console.log(spotify);
  console.log(thisSong);
}

function movieThis() {

}

function doWhatItSays() {

}
