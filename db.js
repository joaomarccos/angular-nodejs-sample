var Engine = require('tingodb')(),
    assert = require('assert');

var db = new Engine.Db(__dirname + '/db', {});
var contatos = db.collection("contacts");
var operadoras = db.collection("operadoras");

contatos.insert([
	{name: 'João', phone: '993317183', color: 'red'},
	{name: 'Nayara', phone: '991412380', color: 'pink'},
	{name: 'Marcos', phone: '993317183', color: 'blue', operadora:{name:"Claro", cod: 21, categoria:"Celular"}}
]);

operadoras.insert([
	{name:"Claro", cod: 21, categoria:"Celular"},
	{name:"Tim", cod: 41, categoria:"Celular"},
	{name:"Oi", cod: 14, categoria:"Celular"},
	{name:"Vivo", cod: 15, categoria:"Celular"},
	{name:"GVT", cod: 25, categoria:"Fixo"}
]);