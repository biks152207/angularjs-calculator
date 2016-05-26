(function(){
  'use strict';
  angular.module('testProject1App')
    .controller('emailCtrl',Controller);

  Controller.$inject = ['$timeout'];

  function Controller($timeout){
    var vm = this;
    vm.formData = {}
    vm.message = null;
    vm.submit = submit.bind(vm);

    function submit(validity, form){
      if (validity){
        $('#emailForm')[0].reset();
        form.$setPristine(true);
        vm.message = 'Successfully submitted';
        $timeout(function(){
          vm.message = null;
        },4000);
      }
    }

  }

})();
