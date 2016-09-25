'use strict';

angular.module('myApp')

	.controller('pathDetailsCtrl', ['$scope', '$http', '$stateParams', '$state', 'learningPathService' ,function($scope, $http, $stateParams, $state, learningPathService) {
		
		var vm = this; 
		vm.tags=[];
		vm.currentTabID = $stateParams.id;
		var learningPaths = learningPathService.getLearingPaths();
		if(learningPaths.length === 0) {
			var getPathsurl = ' https://hackerearth.0x10.info/api/learning-paths?type=json&query=list_paths';
			$http.get(getPathsurl).success(function(data) {
			 	angular.forEach(data.paths, function(value, key) {
					if(value.id === $stateParams.id){
							var retrievedObject = JSON.parse(localStorage.getItem(value.id));
							vm.data =value;
					  		vm.data.upVotes = retrievedObject.upVotes;
					  		vm.data.downVotes = retrievedObject.downVotes;
					  		return;
					}
					var pathTags = (value.tags).split(',');
					angular.forEach(pathTags, function(value, key) {
						vm.tags.push(value);
					});
				});
			 	learningPathService.setLearingPaths(data.paths);
				vm.keys = data.paths;
			})
		}
		else{
			var data = learningPaths;
			angular.forEach(data, function(value, key) {
					if(value.id === $stateParams.id){
							var retrievedObject = JSON.parse(localStorage.getItem(value.id));
							vm.data =value;
					  		vm.data.upVotes = retrievedObject.upVotes;
					  		vm.data.downVotes = retrievedObject.downVotes;
					  		return;
					}
					var pathTags = (value.tags).split(',');
					angular.forEach(pathTags, function(value, key) {
						vm.tags.push(value);
					});
				});
			vm.keys = data;
		}

		vm.changeTab = function (pathId) {
			$state.go('path-details', {
				id: pathId
			});
		}

		vm.setUpVotes = function(id, upVotes, downVotes) {
			upVotes = upVotes + 1;
			vm.data.upVotes = upVotes;
			var votes = { 'upVotes': upVotes, 'downVotes': downVotes};
			localStorage.setItem(id, JSON.stringify(votes));
		}

		vm.setDownVotes = function(id, upVotes, downVotes) {
			downVotes = downVotes + 1;
			vm.data.downVotes = downVotes;
			var votes = { 'upVotes': upVotes, 'downVotes': downVotes};
			localStorage.setItem(id, JSON.stringify(votes));
		}

		vm.onSelect = function(tag) {
			var pathId;
			if(learningPaths.length === 0){
				learningPaths = learningPathService.getLearingPaths();
			}
			angular.forEach(learningPaths, function(paths, key) {
				var tags= paths.tags.split(',');
				angular.forEach(tags, function(path, key) {
					if(path === tag){
						$state.go('path-details', {
							id: paths.id
						});
					}
				});
			});
		}

	}]);