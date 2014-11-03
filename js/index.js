var indexApp = angular.module('indexApp', ['ui.bootstrap']);
indexApp.directive('myModal', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.dismiss = function () {

            };
        }
    }
});
indexApp.controller("LoginDialogController", function ($scope) {
    $scope.ok = function () {
        window.location = "feed.html";
    };
});
indexApp.controller('homeModalCtrl', function ($scope, $modal, $log) {

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'homeModal.html',
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

indexApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.ok = function () {
        window.location = "main.html";
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
