'use strict';

angular.module('facepunchApp')

.factory('Threads', ['Restangular', function (Restangular) {
    var _rest = Restangular.all('threads');
    return {
      findOne: function(id){
        return _rest.get(id).then(function(res){ return res.data });
      }
    };
  }
]);
