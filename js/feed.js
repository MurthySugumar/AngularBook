var feedApp = angular.module('feedApp',['ngRoute','ngCookies','LocalStorageModule']);
feedApp.config(function($routeProvider) {
    $routeProvider
    .when('/',
        {
            templateUrl:"feeds.html",
            controller:"feedController"
        })
    .when('/profile',
        {
            templateUrl:"profile.html",
            controller:"profileController"
        })
    .otherwise({
        templateUrl: "feed.html"
      });
});
feedApp.controller("feedController", function($scope) {
    $scope.model = {
        message: "This is my app!!!"
    }
});
/**
 * Services that persists and retrieves TODOs from localStorage
*/
feedApp.factory('todoStorage', function () {
	var STORAGE_ID = 'todos-angularjs-perf';

	return {
		get: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		put: function (todos) {
          //alert("saving:"+JSON.stringify(todos));
			localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
		}
	};
});
feedApp.controller('feedCtrl',function($scope, localStorageService) {

    $scope.saved = localStorage.getItem('taskItems');
    $scope.taskItem = (localStorage.getItem('taskItems')!==null) ?
    JSON.parse($scope.saved) : [ {description: "Why not add a task?", complete: false}];
    localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));

    $scope.newTask = "";


    $scope.addNew = function () {
        if ($scope.newTask == null || $scope.newTask == '') {
            $scope.taskItem.push({

                description: $scope.newTask
            })
            console.log("true"+$scope.newTaskDate);
        } else {

            $scope.taskItem.push({
                description: $scope.newTask
            })
            console.log("false"+$scope.newTask);
        };
        $scope.newTask = '';

        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    };
    $scope.deleteTask = function (index) {
        var completedTask = $scope.taskItem;
        $scope.taskItem = [];
        angular.forEach(completedTask, function (taskItem) {
            if (!taskItem.complete) {
                $scope.taskItem.push(taskItem);

            }
        });
        $scope.taskItem.splice(index, 1);
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    };

    $scope.save = function () {
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    }
});
