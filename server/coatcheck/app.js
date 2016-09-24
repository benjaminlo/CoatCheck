var express = require('express');
var clothing = require("./clothing.js");
var http = require('http');
var firebase = require("firebase");
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD4uwkrKivTCI4ss2lLaxXZ9RrfwfBdlbo",
    authDomain: "coat-check-6b884.firebaseapp.com",
    databaseURL: "https://coat-check-6b884.firebaseio.com",
    storageBucket: "coat-check-6b884.appspot.com",
    messagingSenderId: "348697547557"
};
firebase.initializeApp(config);
var database = firebase.database();

app.get('/closet', function (req, res) {
    return database.ref('/').once('value').then(function (snapshot) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(snapshot.val()));
        res.sendStatus(200);
    });
});

app.get('/ask', function (req, res) {
    return database.ref('/').once('value').then(function (snapshot) {
        var requestedTags = JSON.parse(req.query.tags);
        var closet = snapshot.val();
        var tagDictionary = {
            "sun": false,
            "snow": false,
            "rain": false,
            "hot": false,
            "moderate": false,
            "cold": false
        };
        var suggestedClothing;

        requestedTags.forEach(function (requestedTag) {
            tagDictionary[requestedTag] = true;
        });

        for (var item in closet) {
            if (closet.hasOwnProperty(item)) {
                var score = 0;
                var maxScore = 0;
                var tags = closet[item].tags;
                if (tags != null) {
                    tags.forEach(function (tag) {
                        if (tagDictionary[tag] === true) {
                            score = score + 1;
                        }
                    });
                    if (score > maxScore) {
                        maxScore = score;
                        suggestedClothing = item;
                    }
                }
            }
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(suggestedClothing));
        res.sendStatus(200);
    });
});

app.post('/delete', function (req, res) {
    database.ref(req.body.name).remove();
    res.sendStatus(200);
});

app.post('/add', function (req, res) {
    var newClothing = {
        name: req.body.name
    };

    database.ref(req.body.name).set(newClothing);
    res.sendStatus(200);
});

app.listen(process.env.PORT || 3000);
