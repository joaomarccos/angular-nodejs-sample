angular.module('app').directive('uiAlert',function(){
	return {
		templateUrl:'partial/alert.html',
		restrict: 'E',
    	scope: { 
    		title: '@' 
    	},
    	transclude: true
	}
});
