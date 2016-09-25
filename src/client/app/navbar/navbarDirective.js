angular.module('myApp')
.directive('navbar', function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: '/src/client/app/navbar/navbar.html'
  }
});