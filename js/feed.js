var feedApp = angular.module('feedApp', ['ngRoute', 'ngCookies', 'ngAnimate', 'LocalStorageModule', 'ui.bootstrap']);
feedApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "feeds.html",
            controller: "feedController"
        })
        .when('/profile', {
            templateUrl: "profile.html",
            controller: "profileController"
        })
        .otherwise({
            redirectTo: '/'
        });;
});
feedApp.controller('profileController', function ($scope, $modal) {});
feedApp.controller('feedController', function ($scope, localStorageService) {

    $scope.saved = localStorage.getItem('taskItems');
    $scope.taskItem = (localStorage.getItem('taskItems') !== null) ?
        JSON.parse($scope.saved) : [];
    localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    $scope.newTask = "";
    $scope.validUrl = "";
    $scope.pattern = new RegExp('^(https?:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + '(\\?[;&a-z\\d%_.~+=-]*)?' + '(\\#[-a-z\\d_]*)?$', 'i');

    $scope.open = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    }

    $scope.addNew = function () {
        $scope.date = new Date();
        if ($scope.newTask == null || $scope.newTask == '') {
            alert("should not be empty");
        } else {
            if ($scope.pattern.test($scope.newTask)) {
                $scope.validUrl = "url";
                $scope.taskItem.push({
                    description: $scope.newTask,
                    date: $scope.date,
                    validUrl: $scope.validUrl
                })
            } else {
                $scope.validUrl = "text";
                $scope.taskItem.push({
                    description: $scope.newTask,
                    date: $scope.date,
                    validUrl: $scope.validUrl
                })
            }

        };
        $scope.newTask = '';
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    };
    $scope.redirectUrl = function (url) {
        if ($scope.pattern.test(url)) {
            window.open("http://" + url);
        }
    }
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
});

feedApp.controller("LogoutDialogController", function ($scope) {
    $scope.ok = function () {
        window.location = "feed.html";
    };
});
feedApp.controller('feedModalCtrl', function ($scope, $modal, $log) {

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'feedModal.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {}
            }
        });

        modalInstance.result.then(function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
});

feedApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.ok = function () {
        window.location = "index.html";

    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
