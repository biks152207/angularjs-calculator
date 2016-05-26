(function(){
  'use strict';
  angular.module('testProject1App')
    .factory('httpResource', Resource);

  Resource.$inject = ['$http'];

  function Resource($http){
    return {
      getResource: getResource
    }

    function getResource(){
      return $http.get('scripts/data/resource.json');
    }
  }

})();
