// node module imports to run liri-node-app

var env = require ("dotenv").config();

var keys = require ("./keys.js");
var Spotify = require ("node-spotify-api");
var Twitter = require ("twitter");
var request = require ("request");
var fs = require ("fs");
var spotifyclient = new Spotify (keys.spotify);
var twitterclient = new Twitter(keys.twitter);
var liriArgument = process.argv[2];
var songName = "";
var movieName = "";
var params = { screen_name: 'Super18Eddy', count: 20 };


// switch command for liri app

switch(liriArgument) {
//

    case "my-tweets": 
        myTweets(); 
        break;
    case "spotify-this-song": 
        spotifyThisSong(); 
        break;
    case "movie-this": 
        movieThis(); 
        break;
    case "do-what-it-says": 
        dowhatItsays(); 
        break;
    default: 
        console.log("==welcome to liri-app:==\n" + "\n mytweet'Super18Eddy'" + "\n spotifyThisSong 'I Want it That Way'"+ "\n movieThis'Mr Bond'" + "\n do-what-it-says."+"\n\n");
}


//========================================
//twitter function & API
function myTweets() {
    var Twitter = require('twitter');

        var client = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        });

    var params = { screen_name: 'Super18Eddy', count: 20 };
    twitterclient.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
                console.log('');

            }
        }
    });
}


// Spotify function call

   // case "spotify-this-song" :
function spotifyThisSong() {

if (process.argv.length === 3) {

    var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
    id:"764cfc50fafb4da5ae27cac868971741",
  secret: "11c3c8e4ed444de3bf6422906b818924"
    });
     
    spotify.search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err,data) {
    console.log(err);
  });
}
}

//break;

    // OMDB function call using request

function movieThis() {
        if (process.argv[3] === undefined) {
 
            request('http://www.omdbapi.com/?apikey=995d01b&t=' + 'Spectre', function (error, response, body) {
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
        } else {
             for(i=3;i<process.argv.length;i++){
                movieName += process.argv[i] + " ";
            };
            console.log(movieName);
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
        }

        
}
   


//break;
//case "do-what-it-says":
function dowhatItsays() {
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


//reak;

};