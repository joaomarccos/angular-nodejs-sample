angular.module('app').controller('controller', function($scope, contatosAPI, operadorasAPI){
	$scope.contatos = [];
	$scope.operadoras = [];

	var carregarContatos = function  () {
		contatosAPI.getContatos().then(function (response) {			
			$scope.contatos = response.data;				
		});
	};

	var carregarOperadoras = function  () {
		operadorasAPI.getOperadoras().then(function (response) {
			$scope.operadoras = response.data;				
		});
	};

	$scope.adicionarContato = function (contato) {
		contatosAPI.salvarContato(contato).then(function  (response) {
			delete $scope.contato;
			$scope.contatoForm.$setPristine();
			carregarContatos();
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
	carregarOperadoras();
});
