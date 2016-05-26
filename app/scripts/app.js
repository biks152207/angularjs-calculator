(function(){
  'use strict';
  angular
    .module('testProject1App', [
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ui.router'
    ])
    .config(Config);

  Config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function Config($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('main',{
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
      })
    $stateProvider
      .state('email',{
        url: '/email',
        templateUrl: 'views/email.html',
        controller: 'emailCtrl',
        controllerAs: 'vm'
      })
  }

})();
