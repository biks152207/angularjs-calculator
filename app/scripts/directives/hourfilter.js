'use strict';

angular.module('testProject1App')
  .directive('hourFilter', function () {
    return {
      require: 'ngModel',
      restrict: 'EA',
      link: function postLink(scope, element, attrs, ngModel) {
        ngModel.$formatters.push(function(value){
          if (value){
            return value.replace(/\D/g,'');
          }
        });
        ngModel.$parsers.push(function(value){
          if (value){
            return value.replace(/\D/g,'');
          }
        });
      }
    };
  });
