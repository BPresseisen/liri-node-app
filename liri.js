require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var serviceName = process.argv[2];
var nodeArgs = process.argv;
var contentName;

if (nodeArgs.length === 0) {

    contentName = "";

} else {

    // for (var i = 3; i < nodeArgs.length; i++) {

    //     if (i > 3 && i < nodeArgs.length) {
    //     contentName = contentName + "+" + nodeArgs[i];
    //     }
    //     else {
    //     contentName += nodeArgs[i];
    //     }
    // }
    contentName = process.argv.slice(3).join(" ");
};

console.log(serviceName);

switch (serviceName) {

    case 'concert-this':
        concertThis()
        return;

    case 'spotify-this-song':
        spotifyThis()
        return;

    case 'movie-this':
        movieThis()
        return;

    case 'do-what-it-says':

        fs.readFile("random.txt", "utf8", function (error, data) {

            if (error) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log("Error", error.message);
                console.log(error.config);
            }

            spotifyThis(data);
            return;

        });
};

function concertThis() {

    if (contentName === "") {

        //WHAT IS THE DEFAULT SEARCH HERE??
        //
        //--> "I Want it That Way" ??
        //
        //--> IS THIS SPECIFIED ANYWHERE IN THE INSTRUCTIONS
        contentName = "";

    };

    // Then run a request with axios to the Bands in Town API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + contentName + "/events?app_id=codingbootcamp";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios
        .get(queryUrl)
        .then(
            function (response) {
                // console.log(response);
                console.log("The venue is: " + response.data[0].venue.name);
                console.log("The venue is located in: " + response.data[0].venue.city + ", " + response.data[0].venue.region );
                // Date of the Event (use moment to format this as "MM/DD/YYYY")
            })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log(error.request);
                console.log("Error", error.message);
                console.log(error.config);
            }
        });

}

function spotifyThis() {

    spotify = new Spotify(keys.spotify);

    // var spotify = new Spotify({
    //     id: spotKeys.id,
    //     secret: spotKeys.secret
    // });

    if (contentName === "") {
        //"The Sign" by Ace of Base
        contentName = "The Sign"
    };

    spotify
        .search({ type: 'track', query: contentName })
        .then(
            function (response) {
                console.log(response.tracks.items[0]);
                //Artist(s)
                //The song's name
                //A preview link of the song from Spotify
                //The album that the song is from
            })
        .catch(function (err) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log(error.request);
                console.log("Error", error.message);
                console.log(error.config);
            }
        });
}

function movieThis() {

    if (contentName === "") {
        contentName = "Mr. Nobody";
    };

    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + contentName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios
        .get(queryUrl)
        .then(
            function (response) {
                // console.log(response.data);
                console.log("The movie is: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("The release date is: " + response.data.Released);
                console.log("The MPAA rating is: " + response.data.Rated);
                console.log("The IMDB rating is: " + response.data.imdbRating);
                console.log("The Rotten Tomatoes rating is: " + response.data.Ratings[1].value);
                console.log("The production country of origin s: " + response.data.Country);
                console.log("The language of the movie is: " + response.data.Language);
                console.log("The plot is: " + response.data.Plot);
                console.log("The movie's principal actors include: " + response.data.Language);
            })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log(error.request);
                console.log("Error", error.message);
                console.log(error.config);
            }
        });
}



