describe('tournament', function() {

    var module = factory('views/tournament', {
        'services/log': logMock,
        'controllers/TeamImportDialogController': factory('controllers/TeamImportDialogController')
    });

    var $scope, controller;

    var mockTeam = { number: 124 },
        newTeam = { number: 654 },
        mockStage1 = { id: 'stage1', name: 'stage1', rounds: 1 },
        mockStage2 = { id: 'stage2', name: 'stage2', rounds: 3 },
        newStage = { id: 'stage3', name: 'stag3', rounds: 5 },
        mockSettings = {
            currentStage: mockStage1.id,
            referees: [{ name: 'ref1' }, { name: 'ref2' }],
            tables: [{ name: 'table1' }, { name: 'table2' }]
        };

    var settingsMock, stagesMock, teamsMock, scoresMock, challengeMock, messageMock, dialogsMock;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($controller, $rootScope, $q) {
            $scope = $rootScope.$new();
            mockRootScope($scope);
            settingsMock = createSettingsMock($q, mockSettings);
            stagesMock = createStagesMock([mockStage1, mockStage2]);
            teamsMock = createTeamsMock([mockTeam]);
            scoresMock = createScoresMock();
            challengeMock = createChallengeMock();
            messageMock = createMessageMock();
            dialogsMock = { teamsImport: { show: false } };
            controller = $controller('tournamentCtrl', {
                '$scope': $scope,
                '$settings': settingsMock,
                '$stages': stagesMock,
                '$teams': teamsMock,
                '$scores': scoresMock,
                '$challenge': challengeMock,
                '$message': messageMock,
                '$dialogs': dialogsMock
            });
        });
    });

    describe('initialization', function() {
        it('should initialize', function() {
            expect($scope.initPage).toHaveBeenCalled();
        });

        it('should init teams', function() {
            expect(teamsMock.init).toHaveBeenCalled();
        });

        it('should init stages', function() {
            expect(stagesMock.init).toHaveBeenCalled();
        });

        it('should init settings', function() {
            expect(settingsMock.init).toHaveBeenCalled();
        });

        it('should listen to messages', function() {
            expect(messageMock.on).toHaveBeenCalled();
        });

        it('should load challenges', function() {
            expect(challengeMock.getChallenges).toHaveBeenCalled();
        });
    });

    describe('showIcon', function() {

        it('should return upward icon for true', function() {
            expect($scope.showIcon(true)).toBe('keyboard_arrow_up');
        });

        it('should return downward icon for false', function() {
            expect($scope.showIcon(false)).toBe('keyboard_arrow_down');
        });

    });

    describe('teamsTableConfig', function() {

        it('action delete', function() {
            $scope.teamsTableConfig.actions[0].onClick(mockTeam);
            expect(teamsMock.remove).toHaveBeenCalledWith(mockTeam.number);
            expect(teamsMock.save).toHaveBeenCalled();
        });

        it('saves upon editing', function() {
            $scope.teamsTableConfig.edit.onSave();
            expect(teamsMock.save).toHaveBeenCalled();
        });

        it('allows creation', function() {
            expect($scope.teamsTableConfig.create).not.toBe(undefined);
            $scope.teamsTableConfig.create.save(newTeam);
            expect(teamsMock.add).toHaveBeenCalledWith(newTeam);
            expect(teamsMock.save).toHaveBeenCalled();
        });

        it('allows search', function() {
            expect($scope.teamsTableConfig.search).not.toBe(undefined);
            $scope.teamsSearch = '123123';
            expect($scope.teamsTableConfig.search()).toBe($scope.teamsSearch);
        });

    });

    describe('stagesTableConfig', function() {

        beforeEach(function() {
            $scope.stages = stagesMock.stages;
            $scope.settings = settingsMock.settings;
        });

        it('action select', function() {
            $scope.stagesTableConfig.actions[0].onClick(mockStage1);
            expect(settingsMock.settings.currentStage).toBe(mockStage1.id);
            expect(settingsMock.save).not.toHaveBeenCalled();

            $scope.stagesTableConfig.actions[0].onClick(mockStage2);
            expect(settingsMock.settings.currentStage).toBe(mockStage2.id);
            expect(settingsMock.save).toHaveBeenCalled();
            expect(scoresMock.broadcastRanking).toHaveBeenCalledWith(mockStage2);

        });

        it('action delete', function() {
            $scope.stagesTableConfig.actions[1].onClick(mockStage2);
            expect(stagesMock.remove).toHaveBeenCalledWith(mockStage2.id);
            expect(stagesMock.save).toHaveBeenCalled();
        });

        it('action move up', function() {
            $scope.stagesTableConfig.actions[2].onClick(mockStage2);
            expect(stagesMock.moveStage).toHaveBeenCalledWith(mockStage2, -1);
            expect(stagesMock.save).toHaveBeenCalled();

            expect($scope.stagesTableConfig.actions[2].show(mockStage2)).toBe(true);
            expect($scope.stages.length).toBe(2);
            expect($scope.stagesTableConfig.actions[2].show(mockStage1)).toBe(false);
        });

        it('action move down', function() {
            $scope.stagesTableConfig.actions[3].onClick(mockStage2);
            expect(stagesMock.moveStage).toHaveBeenCalledWith(mockStage2, 1);
            expect(stagesMock.save).toHaveBeenCalled();

            expect($scope.stagesTableConfig.actions[3].show(mockStage1)).toBe(true);
            expect($scope.stagesTableConfig.actions[3].show(mockStage2)).toBe(false);
        });

        it('saves upon editing', function() {
            $scope.stagesTableConfig.edit.onSave();
            expect(stagesMock.save).toHaveBeenCalled();
        });

        it('allows creation', function() {
            expect($scope.stagesTableConfig.create).not.toBe(undefined);
            $scope.stagesTableConfig.create.save(newStage);
            expect(stagesMock.add).toHaveBeenCalledWith(newStage);
            expect(stagesMock.save).toHaveBeenCalled();
        });

        it('sort only chronologically', function() {
            expect($scope.stagesTableConfig.sort).not.toBe(undefined);
            expect($scope.stagesTableConfig.sort(mockStage1, mockStage2) > 0).toBe(false);
        });

    });

    describe('refereesTableConfig', function() {

        beforeEach(function() {
            $scope.settings = settingsMock.settings;
        });

        it('action delete', function() {
            $scope.refereesTableConfig.actions[0].onClick(mockTeam);
            expect(settingsMock.save).toHaveBeenCalled();
        });

        it('saves upon editing', function() {
            $scope.refereesTableConfig.edit.onSave();
            expect(settingsMock.save).toHaveBeenCalled();
        });

        it('allows creation', function() {
            expect($scope.refereesTableConfig.create).not.toBe(undefined);
            $scope.refereesTableConfig.create.save(newTeam);
            expect(settingsMock.save).toHaveBeenCalled();
        });

    });

    describe('tablesTableConfig', function() {

        beforeEach(function() {
            $scope.settings = settingsMock.settings;
        });

        it('action delete', function() {
            $scope.tablesTableConfig.actions[0].onClick(mockTeam);
            expect(settingsMock.save).toHaveBeenCalled();
        });

        it('saves upon editing', function() {
            $scope.tablesTableConfig.edit.onSave();
            expect(settingsMock.save).toHaveBeenCalled();
        });

        it('allows creation', function() {
            expect($scope.tablesTableConfig.create).not.toBe(undefined);
            $scope.tablesTableConfig.create.save(newTeam);
            expect(settingsMock.save).toHaveBeenCalled();
        });

    });

    describe('importTeams', function() {

        it('should show TeamImportDialog', function() {
            $scope.importTeams();
            expect(dialogsMock.teamsImport.show).toBe(true);
        });

    });

    describe('saveSettings', function() {

        it('should call $settings.save', function() {
            $scope.saveSettings();
            expect(settingsMock.save).toHaveBeenCalled();
        });

    });

});
