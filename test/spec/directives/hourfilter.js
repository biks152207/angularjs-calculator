'use strict';

describe('Directive: hourFilter', function () {

  // load the directive's module
  beforeEach(module('testProject1App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<hour-filter></hour-filter>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the hourFilter directive');
  }));
});
