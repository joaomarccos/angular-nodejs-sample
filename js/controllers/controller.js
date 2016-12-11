angular.module('app').controller('controller', function($scope, $http){
	$scope.contatos = [];
	$scope.operadoras = [];

	var carregarContatos = function  () {
		$http.get("http://127.0.0.1:3000/contatos").then(function (response) {
			$scope.contatos = response.data;				
		});
	};

	var carregarOperadoras = function  () {
		$http.get("http://127.0.0.1:3000/operadoras").then(function (response) {
			$scope.operadoras = response.data;				
		});
	};

	$scope.adicionarContato = function (contato) {
		$scope.contatos.push(angular.copy(contato));
		delete $scope.contato;
		$scope.contatoForm.$setPristine();
	};

	$scope.apagarContatos = function  (contatos) {
		$scope.contatos = (contatos.filter(function  (contato) {
			return !contato.selecionado;
		}))
	};		

	$scope.isContatoSelecionado = function  (contatos) {
		 return contatos.some(function  (contato) {
			return contato.selecionado;
		})
	};

	carregarContatos();
	carregarOperadoras();
});
