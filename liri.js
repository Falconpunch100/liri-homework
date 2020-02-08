require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var music = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");
var fs = require("fs");
readCommand(process.argv[2], process.argv[3]);

function readCommand(command, command2){
    if (command === 'concert-this'){
        searchConcert(command2);
    }
    
    else if (command === 'spotify-this-song'){
        searchSpotify(command2);
    }
    
    else if (command === 'movie-this'){
        searchMovie(command2);
    }
    
    else if (command === 'do-what-it-says'){
        searchFile(command2);
    }
    
    else {
        console.log("Invalid command. Try again.");
    }
}

function searchConcert(input) {
    if (input === "") {
        console.log("Cannot be empty. Try again.");
        return 0;
    }
    var concertInfo = axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp");
    console.log(concertInfo);
    concertInfo.then(function(response){
        console.log(response.data[0].venue);
        console.log(response.data[0].datetime);
    });
}

function searchSpotify(input) {
    if (input === ""){
        input = "The Sign";
    }

    music.search({ type: 'track', query: input })

    .then(function(response) {
    console.log(response.tracks.items[0].album.artists[0].name);
    console.log(input);
    console.log(response.tracks.items[0].album.external_urls.spotify);
    console.log(response.tracks.items[0].album.name);
  })
  .catch(function(err) {
    console.log(err);
  });
}

function searchMovie(input) { 
    if (input === "") {
        console.log("Cannot be empty. Try again.");
        return 0;
    }
    var movieInfo = axios.get("http://www.omdbapi.com/?t=" + input + "&apikey=trilogy&");
    console.log(movieInfo);
    movieInfo.then(function(response){
        console.log(response.data);
    });
}

function searchFile(input) {
    fs.readFile('random.txt', 'utf8', function(error, data){
        if (error){
            console.log("Error. Try again.");
            return 0;
        }
        else {
            var dataArray = data.split(",")
            readCommand(dataArray[0],dataArray[1]);
        }
    });
}