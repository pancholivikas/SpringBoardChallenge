'use strict';

angular.module('myApp')
	.config(['$httpProvider', function($httpProvider){
	    delete $httpProvider.defaults.headers.common['X-RateLimit-Limit'];
	}])

	.controller('homeCtrl', ['$scope', '$http', '$state', 'learningPathService', function($scope, $http, $state, learningPathService) {

		var vm = this; 
		vm.orderProperty;
		var getPathsurl = ' https://hackerearth.0x10.info/api/learning-paths?type=json&query=list_paths';
		var learningPaths = learningPathService.getLearingPaths();
		if(learningPaths.length === 0) {
			$http.get(getPathsurl, 
						{
	    					headers: {
	    						//'X-RateLimit-Limit': '5',
	    						'content-type':'application/text'
	    					}
	    				}).success(function(data) {
						 	var votes = { 'upVotes': 0, 'downVotes': 0 };
							angular.forEach(data.paths, function(value, key) {
								if (localStorage.getItem(value.id) === null) {
									localStorage.setItem(value.id, JSON.stringify(votes));
									value.upVotes = votes.upVotes;
									value.downVotes = votes.downVotes;
								}
								else {
									var retrievedObject = JSON.parse(localStorage.getItem(value.id));
									//console.log('retrievedObject: ', JSON.parse(retrievedObject));
									value.upVotes = retrievedObject.upVotes;
									value.downVotes = retrievedObject.downVotes;
								}
							});
							learningPathService.setLearingPaths(data.paths);
						 	vm.data = data.paths;
			 })
		}
		else{
			vm.data = learningPaths;
		}


		$http.get('/src/client/app/config/sortKeys.json').success(function(data) {
			vm.keyData = data.sortKeys;
			vm.activeMenu = vm.keyData[0].id;
			vm.orderProperty = '-' + vm.keyData[0].id;
		})

		vm.gotoDetails = function(pathId) {
			$state.go('path-details', {
				id: pathId
			});
		}

		vm.setOrderProperty = function(propertyName) {
			vm.orderProperty = '-' + propertyName;
			vm.activeMenu = propertyName;
		}

	}]);