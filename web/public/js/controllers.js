
var app = angular.module('app', ['angularMoment', 'ngRoute', 'frapontillo.bootstrap-switch']);

var controllers = [
];

app.config(['$routeProvider', function($routeProvider) {
  angular.forEach(controllers, function(route) {
    $routeProvider.when(route.path, {
      templateUrl: route.templateUrl,
      controller: route.controller
    });
  });
  
  // add non-sidebar routes here
  $routeProvider.
  when('/', {
    templateUrl: 'index',
    controller: 'IndexCtrl'
  }).
  otherwise({
    redirectTo: '/'
  });

}]);

app.controller('IndexCtrl', function($scope, $http, $location, $timeout) {
  var successCallback = function(err, data) {
    $('#notify-checked').show();

    $timeout(function() {
      $('#notify-checked').hide();
    }, 2000);
  };
  $scope.data = {};
  $scope.getNotified = function() {
    $http
    .post('/notified.json', $scope.data)
    .success(successCallback);
  };
});