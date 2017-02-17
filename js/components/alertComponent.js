angular.module('app').component('uiAlert',{
     
        bindings: { 
            title: '@' 
        },
        templateUrl:'partial/alert.html',       
        transclude: true,
        controller: function () {
            var vm = this;

            vm.$onInit = function () {
                vm.title = vm.title?vm.title:'Oops! Aconteceu algum erro';
            }
        }
    
});

