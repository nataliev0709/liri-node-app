var keys = require('./keys.js');

var Twitter = require('twitter');
var spotify = require('spotify');
var request = require("request");
var fs = require("fs");

var client = new Twitter(keys.twitterKeys);

var myTweets = function() {
    var params = { screen_name: 'nashi0709' };
    client.get('statuses/user_timeline', function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at + " " + tweets[i].text)
            };
        };
    });
};

//not working..data is not being printed and keep getting an error code { error: { status: 
//401, message: 'No token provided' } }..not sure what is needed bc of this..seems like we 
//need to log in in order to hit the api?? 
spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    };
    //console.log(data);
    // Do something with 'data' 
});



var newMovie = function(movieName) {
    request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json&apikey=7570a7d8', function(error, response, body) {

        var json = JSON.parse(body);
        if (error) {
            console.log('Error occurred: ' + error);
            return;
        };
        console.log('Title: ', json.Title);
        console.log('Year: ', json.Year);
        console.log('Rating: ', json.Rated);
        console.log('Country: ', json.Country);
        console.log('Language: ', json.Language);
        console.log('Plot: ', json.Plot);
        console.log('Actors: ', json.Actors);

    });
};

var runCommand = function(command, argument) {
    if (command === "my-tweets") {
        myTweets();
    } else if (command === "movie-this") {
        //"!" negates condition
        // e.g. !true == false and !false == true
        //Mr. Nobody ran bc function was called and it was passed through as process.argv[3]
        if (!argument) {
            newMovie("Mr. Nobody");
        } else {
            newMovie(argument);
        }
    } else if (command === "do-what-it-says") {
        readFile();
    } else {
        console.log("you didn't fill in anything")
    }
};

var readFile = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        // command,argument
        var dataArr = data.split(",");
        var command = dataArr[0];  // movie-this
        var argument = dataArr[1]; // "Home Alone"

        console.log(`this is going to run the program as if you typed node liri.js ${command} ${argument}`);

        runCommand(command, argument);

    })
};

runCommand(process.argv[2], process.argv[3]);