// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('DetectorSelector', ['ionic', 'DetectorSelector.controllers', 'DetectorSelector.services', 'ngSanitize'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'MenuCtrl'
  })

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent': {
          templateUrl: "templates/home.html",
          controller: 'HomeCtrl'
        }
      }
    })
    
    .state('app.search', {
        url: "/search",
        views: {
            'menuContent':{
              templateUrl: "templates/search.html",
              controller: "SearchCtrl"
            }
        }
    })
    
    .state('app.scenario', {
      url: "/scenario",
      views: {
        'menuContent': {
          templateUrl: "templates/scenario.html",
          controller: 'ScenarioCtrl'
        }
      }
    })

    .state('app.type', {
      url: "/type",
      views: {
        'menuContent': {
          templateUrl: "templates/type.html",
          controller: 'TypeCtrl'
        }
      }
    })
    
    .state('app.detectors', {
      url: "/detectors/:scenario",
      views: {
        'menuContent': {
          templateUrl: "templates/detectors.html",
          controller: 'DetectorsCtrl'
        }
      }
    })

    .state('app.details', {
      url: "/detectors/:detectorDetails",
      views: {
        'menuContent': {
          templateUrl: "templates/detectorDetails.html",
          controller: 'DetectorDetailsCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
