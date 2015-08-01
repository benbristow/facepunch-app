'use strict';

angular.module('facepunchApp')

.controller('ThreadCtrl', ['$scope', 'thread', function($scope, thread) {
  $scope.thread = thread;

}]);
