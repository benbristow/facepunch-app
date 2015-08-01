// Ionic facepunchApp App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'facepunchApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'facepunchApp.services' is found in services.js
// 'facepunchApp.controllers' is found in controllers.js
angular.module('facepunchApp', ['restangular', 'ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, RestangularProvider) {
  //Tabs at bottom for all devices
  $ionicConfigProvider.tabs.position('bottom');

  RestangularProvider.setBaseUrl('https://fpapi.benbristow.co.uk/v1');

  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.forums', {
    url: '/forums',
    views: {
      'tab-forums': {
        templateUrl: 'templates/tab-forums.html',
        controller: 'ForumsCtrl'
      }
    },
    resolve: {
      forums: function(Forums) {
        return Forums.findAll();
      }
    }
  })

  .state('tab.forum-detail', {
    url: '/forums/:forumId',
    views: {
      'tab-forums': {
        templateUrl: 'templates/forum-detail.html',
        controller: 'ForumCtrl'
      }
    },
    resolve: {
      forum: function(Forums, $stateParams) {
        return Forums.findOne($stateParams.forumId);
      }
    }
  })

  .state('tab.thread-detail', {
    url: '/threads/:threadId',
    views: {
      'tab-forums': {
        templateUrl: 'templates/thread-detail.html',
        controller: 'ThreadCtrl'
      }
    },
    resolve: {
      thread: function(Threads, $stateParams) {
        return Threads.findOne($stateParams.threadId);
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/forums');

});
