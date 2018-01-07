describe('scoresheet',function() {

    var module = factory('views/scoresheet',{
        'services/log': logMock
    });

    var $scope, controller, $window;
    var dummyTeam =  {
        number: '123',
        name: 'foo'
    };
    var dummyStage = { id: "qualifying", name: "Voorrondes", rounds: 3 };
    var dummySettings = {bla: 'blu'};
    var fsMock = createFsMock({"settings.json": []});
    var settingsMock, handshakeMock, challengeMock, scoresMock;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($controller,$rootScope,$q) {
            settingsMock = createSettingsMock($q, dummySettings);
            handshakeMock = createHandshakeMock($q);
            challengeMock = createChallengeMock();
            scoresMock = createScoresMock();
            $scope = $rootScope.$new();
            mockRootScope($scope);
            $window = {
                Date: function() {
                    this.valueOf = function() {
                        return 42;
                    };
                },
                alert: jasmine.createSpy('alertSpy')
            };
            controller = $controller('scoresheetCtrl', {
                '$scope': $scope,
                '$fs': fsMock,
                '$settings': settingsMock,
                '$scores': scoresMock,
                '$score': createScoreMock(scoresMock.scores[0]),
                '$stages': {},
                '$handshake': handshakeMock,
                '$teams': {},
                '$scores': scoresMock,
                '$challenge': challengeMock,
                '$window': $window
            });
        });
    });

    describe('initialization',function() {
        it('should initialize',function() {
            expect($scope.initPage).toHaveBeenCalled();
        });
    });

});
