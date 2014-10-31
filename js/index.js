var indexApp = angular.module('indexApp',[]);
indexApp.directive('myModal', function() {
    return {
     restrict: 'A',
     link: function(scope, element, attr) {
       scope.dismiss = function() {

       };
     }
   }
});
indexApp.controller("LoginDialogController",function($scope) {
    $scope.ok = function(){
      window.location="feed.html";
    };
});

