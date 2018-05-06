// node module imports to run liri-node-app

var env = require ("dotenv").config();
var key = require ("./keys.js");
var spotify = require ("spotify");
var twitter = require ("twitter");
var request = require ("request");
var fs = require ("fs");
var liriArgument = process.argv[2];
var sClient = new Spotify(keys.spotify);
var tClient = new Twitter(keys.twitter);
var songName = "";
var movieName = "";
var params = { screen_name: '', count: 20 };

// switch command for liri app

switch(liriArgument) {
//

    case "my tweets" : myTweets(); break;
    case "spotify-this-song" : spotifyThisSong(); break;
    case "movie-this" : movieThis(); break;
    case "do-what-it-says" : dowhatItsays(); break;
    default: console.log("==welcome to liri-app:==\n" + "\n mytweet'Super18Eddy'" + "\n spotifyThisSong 'I Want it That Way'"+ "\n movieThis'Mr Bond'" + "\n do-what-it-says."+"\n\n")
}

//========================================
//twitter function & API

var Twitter = require('twitter');

var tClient = new Twitter({
    consumer_key: 'h5SNatQrcmbMcyN72lW4yMk0A',
    consumer_secret: 'HCebEakTWCT8o4ApMN0FCdufafatnQv73nnP58g6Wqgfz7vidf',
    access_token_key: '993203778588307456-jpMMztwomOpW5zRiCVDWOybgrreAKg2',
    access_token_secret: '0zJ7BR92pCbt96MIkmOWi6sxMScaMyGNOGKezrmto19se'
});

var params = { screen_name: 'Super18Eddy', count:20};
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
        console.log(tweets);
    }
});

// Spotify call

    case "spotify-this-song" : spotifyThisSong ()

if (process.argv.length === 3) {

    spotifyClient.search({ type: "track", query: 'the sign ace of base' }, function (error, data) {
        if (error) {
            console.log('Error occurred: ' + error);
        }

        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("Song Name: " + songs[i].name);
            console.log('artist(s): ' + songs[i].artists.map(function (artist) {
                return artist.name;
            }));
            console.log('preview song: ' + songs[i].preview_url);
            console.log("album: " + songs[i].album.name);
        }
    });

} else {

    for (i = 3; i < process.argv.length; i++) {
        songName += process.argv[i] + " ";
    };

    spotifyClient.search({ type: "track", query: songName }, function (error, data) {
        if (error) {
            console.log('Error occurred: ' + error);
        }

        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("Song Name: " + songs[i].name);
            console.log('artist(s): ' + songs[i].artists.map(function (artist) {
                return artist.name;
            }));
            console.log('preview song: ' + songs[i].preview_url);
            console.log("album: " + songs[i].album.name);
        }
    });
}

break;

    // OMDB call using request

    case "movie-this":

for (i = 3; i < process.argv.length; i++) {
    movieName += process.argv[i] + " ";
};

request('http://www.omdbapi.com/?apikey=995d01b&t=' + movieName, function (error, response, body) {
    var jsonData = JSON.parse(body);
    console.log('error:', error); // Print the error if one occurred
    console.log(jsonData.Title);
    console.log(jsonData.Year);
    console.log(jsonData.Rated);
    console.log(jsonData.imdbRating);
    console.log(jsonData.Country);
    console.log(jsonData.Language);
    console.log(jsonData.Plot);
    console.log(jsonData.Actors);
});


break;
case "do-what-it-says":

fs.readFile('random.txt', 'utf8', function (err, data) {
    if (err) throw err;
    var dataArr = data.split(",");
    argument = dataArr[0];
    songName = dataArr[1];
    console.log(argument);
    console.log(songName);

    spotifyClient.search({ type: "track", query: songName }, function (error, data) {
        if (error) {
            console.log('Error occurred: ' + error);
        }
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("Song Name: " + songs[i].name);
            console.log('Artist(s): ' + songs[i].artists.map(function (artist) {
                return artist.name;
            }));
            console.log('Preview Song Here: ' + songs[i].preview_url);
            console.log("Album: " + songs[i].album.name);
        }
    });

});


break;

};