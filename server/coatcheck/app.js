var express = require('express');
var clothing = require("./clothing.js");
var http = require('http');
var firebase = require("firebase");
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBcBk7hKhaxnflgTI57qAevJchUIw6wtvE",
    authDomain: "coat-check.firebaseapp.com",
    databaseURL: "https://coat-check.firebaseio.com",
    storageBucket: "coat-check.appspot.com",
    messagingSenderId: "556056161259"
};
firebase.initializeApp(config);

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(clothing));
});

app.post('/add', function (req, res) {
    var newClothing = {
        name: req.body.name,
        tags: req.body.tags
    }

    firebase.database().ref('/').push(newClothing);
    res.sendStatus(200)
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});