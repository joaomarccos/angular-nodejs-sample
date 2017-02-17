angular.module('app').controller('contatosController', ['$scope','contatosAPI', function($scope, contatosAPI){
	$scope.contatos = [];	

	var carregarContatos = function  () {
		contatosAPI.getContatos().then(function (response) {			
			$scope.contatos = response.data;				
		});		
	};

	$scope.apagarContatos = function  (contatos) {
		var contatosToRm = contatos.filter(function  (contato) {			
			return contato.selecionado;
		});				
		contatosAPI.apagarContatos(contatosToRm).then(function  (response) {
			carregarContatos();
		})
	};		

	$scope.isContatoSelecionado = function  (contatos) {
		 return contatos.some(function  (contato) {
			return contato.selecionado;
		})
	};	

	carregarContatos();	
}]);