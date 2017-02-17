angular.module('app').directive('navigateTo', ['$location', function($location){	
	return {
		restrict: 'A', 
		link: function($scope, iElm, iAttrs) {
			var path;
			iAttrs.$observe('navigateTo', function (val) {
				path = val;
			});
			iElm.bind('click', function () {
				$scope.$apply(function () {
					$location.path(path);
				})
			})
		}
	};
}]);