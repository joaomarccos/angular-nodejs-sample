angular.module('app').controller('addContatoController', ['$scope','contatosAPI', 'operadorasAPI', '$location', function($scope, contatosAPI, operadorasAPI, $location){
	$scope.contatos = [];
	$scope.operadoras = [];

	var carregarOperadoras = function  () {
		operadorasAPI.getOperadoras().then(function (response) {
			$scope.operadoras = response.data;				
		});
	};

	$scope.adicionarContato = function (contato) {
		contatosAPI.salvarContato(contato).then(function  (response) {
			delete $scope.contato;
			$scope.contatoForm.$setPristine();
			$location.path("/contatos");
		});		
	};	
	
	carregarOperadoras();
}]);