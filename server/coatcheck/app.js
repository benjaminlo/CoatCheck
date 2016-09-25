'use strict';

const Constants = require('./constants.js');
const express = require('express');
const clothing = require("./clothing.js");
const http = require('http');
const firebase = require("firebase");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

// Initialize Firebase
let config = {
    apiKey: "AIzaSyD4uwkrKivTCI4ss2lLaxXZ9RrfwfBdlbo",
    authDomain: "coat-check-6b884.firebaseapp.com",
    databaseURL: "https://coat-check-6b884.firebaseio.com",
    storageBucket: "coat-check-6b884.appspot.com",
    messagingSenderId: "348697547557"
};
firebase.initializeApp(config);
let database = firebase.database();

app.get('/closet', function (req, res) {
    return database.ref('/').once('value').then(function (snapshot) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(snapshot.val()));
        res.sendStatus(200);
    });
});

app.get('/ask', function (req, res) {
    return database.ref('/').once('value').then(function (snapshot) {
        let requestedTags = JSON.parse(req.query.tags);
        let closet = snapshot.val();
        let tagDictionary = {};
        tagDictionary[Constants.TAG_HOT] = false;
        tagDictionary[Constants.TAG_MODERATE] = false;
        tagDictionary[Constants.TAG_COLD] = false;
        tagDictionary[Constants.TAG_SUN] = false;
        tagDictionary[Constants.TAG_RAIN] = false;
        tagDictionary[Constants.TAG_SNOW] = false;
        let suggestedClothing = {
            name: ''
        };

        requestedTags.forEach(function (requestedTag) {
            tagDictionary[requestedTag] = true;
        });

        for (let item in closet) {
            if (closet.hasOwnProperty(item)) {
                let score = 0;
                let maxScore = 0;
                let tags = closet[item].tags;
                if (tags != null) {
                    tags.forEach(function (tag) {
                        if (tagDictionary[tag] === true) {
                            score = score + 1;
                        }
                    });
                    if (score > maxScore) {
                        maxScore = score;
                        suggestedClothing.name = item;
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
    let newClothing = {
        name: req.body.name
    };

    database.ref(req.body.name).set(newClothing);
    res.sendStatus(200);
});

app.listen(process.env.PORT || 3000);
