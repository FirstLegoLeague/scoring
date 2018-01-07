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
            expect($scope.initPage).toHaveBeenCalled();
        });

        it('should init settings', function() {
            expect(settingsMock.init).toHaveBeenCalled();
        });

        it('should load log content', function() {
            expect(logMock.get).toHaveBeenCalled();
        });
    });

    describe('log', function() {
        it('shuold contain the content of the log', function() {
            expect($scope.log).toEqual('log-content');
        });
    });

    describe('save',function() {
        it('should call $setiings.save',function() {
            $scope.save();
            expect(settingsMock.save).toHaveBeenCalled();
        });
    });

});
