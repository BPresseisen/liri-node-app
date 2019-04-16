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

        contentName = "Drake";

    };

    var queryUrl = "https://rest.bandsintown.com/artists/" + contentName + "/events?app_id=codingbootcamp";

    axios
        .get(queryUrl)
        .then(
            function (response) {
                console.log(response);
                console.log(response.data[0]);
                console.log("The venue is: " + response.data[0].venue.name);
                console.log("The venue is located in: " + response.data[0].venue.city + ", " + response.data[0].venue.region );
                // Date of the Event (use moment to format this as "MM/DD/YYYY")
                var someDate = response.data[0].datetime;
                // console.log(someDate);
                // someDate = someDate.format("MM/DD/YYYY");
                // console.log(someDate);
                console.log("The date of the event is: " + someDate);
            })
        .catch(function (error) {
            if (error.response) {
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

    if (contentName === "") {
        
        contentName = "I Saw the Sign by Ace of Base"
    };

    spotify
        .search({ type: 'track', query: contentName })
        .then(
            function (response) {
                var example=response.tracks.items[0];

                // //artists name
                console.log(example.album.artists[0].name);
                
                //The song's name
                console.log(contentName);

                //A preview link of the song from Spotify
                console.log(example.external_urls.spotify);

                //The album that the song is from
                console.log(example.album.name);
            })
        .catch(function (err) {
            if (error.response) {
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
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log(error.request);
                console.log("Error", error.message);
                console.log(error.config);
            }
        });
}



