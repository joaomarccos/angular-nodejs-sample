angular.module('app').service('contatosAPI', function($http, config){
	this.getContatos = function  () {
		return $http.get(config.baseURL+"/contatos");
	};

	this.salvarContato = function  (contato) {
		return $http.post(config.baseURL+"/contatos", contato);
	};

	this.apagarContatos = function  (contatos) {
		return $http.post(config.baseURL+"/excluircontatos", contatos);
	}
})