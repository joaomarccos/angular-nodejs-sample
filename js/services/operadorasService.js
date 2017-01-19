angular.module('app').service('operadorasAPI', ['$http','config', function($http, config){
	this.getOperadoras = function  () {
		return $http.get(config.baseURL+"/operadoras");
	};
}])