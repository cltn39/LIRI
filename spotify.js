var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require("fs");
var commands = process.argv[2];
var query = process.argv.slice(3).join(" ");
var spotify = new Spotify({
    //add id and secerts
});

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
// Working
function spotifyThisSong() {
    spotify.search({ type: 'track', query: query, limit:1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      
      //Artist(s)
      console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
      //The song's name
      console.log("Song title: " + data.tracks.items[0].album.name);
      //A preview link of the song from Spotify
      console.log("Spotify preview: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
      //The album that the song is from
      console.log("Album title: " + data.tracks.items[0].album.name);
      });    
}
// Working
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

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.split(",")

        console.log("node " + data);
    });
}