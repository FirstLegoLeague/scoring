describe('settings', function() {

    var module = factory('views/settings', {
        'services/log': logMock
    });

    var $scope, controller;

    var settingsMock;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($controller, $rootScope, $q) {
            $scope = $rootScope.$new();
            mockRootScope($scope);
            settingsMock = createSettingsMock($q, {});
            controller = $controller('settingsCtrl', {
                '$scope': $scope,
                '$settings': settingsMock
            });
        });
    });

    describe('initialization', function() {
        it('should initialize', function() {
            $scope.$digest();
            expect($scope.save).not.toBe(undefined);
        });
    });

    describe('missing settings.json on storage',function() {
        beforeEach(function() {
            fsMock.read = jasmine.createSpy('fsReadSpy').andCallFake(function() {
                return Q.reject(new Error('fake file-not-found for settings'));
            });
        });
        xit('should initialize in editmode when no teams found on storage', function() {
            //TODO: check state after reading
        });
    });

    describe('saving',function() {
        it('should write to the file system',function() {
            $scope.save();
            expect(settingsMock.save).toHaveBeenCalled();
        });
    });
});
