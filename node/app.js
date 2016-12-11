var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Embbeded mongodb
var Engine = require('tingodb')();    

// Conection with db
var db = new Engine.Db(__dirname + '/db', {});
var contatos = db.collection("contacts");
var operadoras = db.collection("operadoras");


// rest for contatos
app.route('/contatos')
	.get(function (req, res) {
		contatos.find({}).toArray(function(error, documents) {
		    if (error) {
		    	console.log(error);
		    	res.status(400).end();
		    }
		    res.send(documents);
		});
	})
	.post(function  (req, res) {		
		contatos.insert(req.body, function  (err, result) {			
			if(!err){				
				res.status(200).end();
			}else{
				console.log(err);
				res.status(400).end();
			}			
		});
	});

app.post('/excluircontatos', function  (req, res) {			
	var contactsDelete = [];			
	req.body.forEach(function(item){
	    contactsDelete.push(item._id);
	});
	contatos.remove({'_id':{'$in': contactsDelete}}, function  (err, result) {			
		if(!err){
			res.status(200).end();
		}else{
			console.log(err);
			res.status(400).end();
		}
	});						
});

// get for operadoras
app.get('/operadoras', function  (req, res) {	
	operadoras.find({}).toArray(function(error, documents) {
	    if (error) console.log(error);
	    res.send(documents);
	});
})

// start app
app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});