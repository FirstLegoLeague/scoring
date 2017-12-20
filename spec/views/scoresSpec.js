describe('scores', function() {

    var module = factory('views/scores', {
        'services/log': logMock
    });

    var $scope, controller, scoresMock, teamsMock, stagesMock, settingsMock, $window;

    var mockTeams = [
                {number: 132},
                {number: 2581},
                {number: 445}
            ],
        mockSettings = {};

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($controller, $rootScope,_$window_,_$q_) {
            $scope = $rootScope.$new();
            mockRootScope($scope);
            settingsMock = createSettingsMock(_$q_, mockSettings);
            $window = _$window_;
            scoresMock = createScoresMock();
            teamsMock = createTeamsMock(mockTeams);
            stagesMock = createStagesMock();
            controller = $controller('scoresCtrl', {
                '$scope': $scope,
                '$scores': scoresMock,
                '$teams': teamsMock,
                '$stages': stagesMock,
                '$settings': settingsMock,
                '$window': $window
            });
        });
    });

    describe('initialization', function() {
        it('should initialize', function() {
            expect($scope.initPage).toHaveBeenCalled();
        });
    });

});
