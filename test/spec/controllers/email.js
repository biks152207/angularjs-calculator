'use strict';

describe('Controller: EmailctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('testProject1App'));

  var EmailctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmailctrlCtrl = $controller('EmailctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
