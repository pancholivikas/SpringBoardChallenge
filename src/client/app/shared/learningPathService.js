'use strict';

angular.module('myApp')
	.service('learningPathService', function () {

    var learningPaths = [];
    return {
        getLearingPaths:function () {
            return learningPaths;
        },
        setLearingPaths:function (value) {
            learningPaths = value;
        }
    };
});