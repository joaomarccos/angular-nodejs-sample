var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// app.use(express.favicon("https://www.gravatar.com/438b0c16282fa3ae476be1a27ffca40f"));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var Engine = require('tingodb')();    

var db = new Engine.Db(__dirname + '/db', {});
var contatos = db.collection("contacts");
var operadoras = db.collection("operadoras");

app.get('/contatos', function (req, res) {
	contatos.find({}).toArray(function(error, documents) {
	    if (error) console.log(error);
	    res.send(documents);
	});
});

app.get('/operadoras', function  (req, res) {	
	operadoras.find({}).toArray(function(error, documents) {
	    if (error) console.log(error);
	    res.send(documents);
	});
})

app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});