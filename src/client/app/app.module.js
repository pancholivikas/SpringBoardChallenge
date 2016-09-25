'use strict';

var myApp = angular.module('myApp', 
    [
      'ui.router',
      'ui.bootstrap'
    ]
    );

myApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
  	.state('paths',
  		{
  			url: '/paths',
  			templateUrl: '/src/client/app/home/home.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
  		}
  	)
  	.state('path-details',
  		{
        url: '/path-details/:id',
        templateUrl: '/src/client/app/path-details/pathDetails.html',
        controller: 'pathDetailsCtrl',
        controllerAs: 'vm'
      }
  	);
  $urlRouterProvider.otherwise('/paths');
  $locationProvider.html5Mode(true);
});