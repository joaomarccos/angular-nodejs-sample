angular.module('app').config(['$routeProvider',function(ngroute) {
	ngroute.when("/contatos",{
		templateUrl: "view/contatos.html",
		controller: "contatosController"		
	});

	ngroute.when("/adicionarContato",{
		templateUrl: "view/adicionarContato.html",
		controller: "addContatoController"
	});

	ngroute.otherwise({redirectTo: "/contatos"});
}])