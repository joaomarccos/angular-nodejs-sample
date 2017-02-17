angular.module('app').filter('capitalize', function  () {
	return function  (input) {
		return input.split(' ').map(function  (nome) {
			return (/da|do|de/.test(nome))?nome:nome.charAt(0).toUpperCase() + nome.substring(1);
		}).join(' ');
	}
})