var mockRootScope = function($scope) {
    $scope.initPage = jasmine.createSpy('initPage');
    $scope.goTo = jasmine.createSpy('goTo');
}
