'use strict';

/**
 * @ngdoc overview
 * @name eduraamApp
 * @description
 * # eduraamApp
 *
 * Main module of the application.
 */
angular
  .module('eduraamApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngMaterial',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      /https?:\/\/accounts.eduraam.nl\//,
      /https?:\/\/[[a-z.-_]+.app.eduraam.nl\//,
    ]);
    $routeProvider
      .when('/', {
        templateUrl: 'views/apps.html',
        controller: 'AppsCtrl',
      })
      .when('/app/:id/', {
        templateUrl: 'views/app.html',
        controller: 'AppsCtrl',
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
