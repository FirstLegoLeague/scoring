define('views/tournament', [
    'services/dialogs',
    'services/ng-message',
    'services/ng-stages',
    'services/ng-teams',
    'services/ng-scores',
    'services/ng-settings',
    'services/ng-challenge',
    'controllers/TeamImportDialogController',
    'angular'
], function () {
    var moduleName = 'tournament';
    return angular.module(moduleName, ['TeamImportDialog']).controller(moduleName + 'Ctrl', [
        '$scope', '$stages', '$teams', '$scores', '$settings','$challenge','$dialogs', '$message',
        function ($scope, $stages, $teams, $scores, $settings, $challenge, $dialogs, $message) {
            $scope.initPage(moduleName, $scope);

            $scope.show = {};

            $scope.showIcon = function(show) {
                return show ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
            };

            $scope.teamsTableConfig = {
                id: 'teams-table',
                columns: [
                    { field: 'number', header: '#', edit: 'text' },
                    { field: 'name', header: 'Name', edit: 'text' },
                    { field: 'cityState',header: 'City & State', edit: 'text' },
                    { field: 'country', header: 'Country',      edit: 'text' },
                    { field: 'affiliation', header: 'Affiliation',  edit: 'text' },
                    { field: 'coach1', header: 'Coach 1',      edit: 'text' },
                    { field: 'coach2', header: 'Coach 2',      edit: 'text' },
                    { field: 'judgingGroup', header: 'Judging Group',edit: 'text' },
                    { field: 'pitLocation', header: 'Pit location', edit: 'text' },
                    { field: 'translationNeeded', header: 'Translation?', edit: 'text' },
                ],
                actions: [
                    {
                        onClick: (team) => {
                            $teams.remove(team.number);
                            $teams.save();
                            $scope.teams = $teams._rawTeams;
                        },
                        classes: () => 'btn-danger',
                        icon: 'delete',
                        tooltip: 'delete',
                        requireLoading: true
                    }
                ],
                edit: {
                    onSave: () => {
                        $teams.save();
                        $scope.teams = $teams._rawTeams;
                    }
                },
                create: {
                    message: 'Add new team',
                    save: (newTeam) => {
                        $teams.add(newTeam);
                        $teams.save();
                        $scope.teams = $teams._rawTeams;
                    }
                },
                row: {
                    classes: (team) => `team_${team.number}`
                },
                search : () => $scope.teamsSearch,
                scrollCount: 10
            };

            $teams.init().then(function() {
                $scope.teams = $teams._rawTeams;
            });

            $scope.teamsSearch = '';

            $scope.importTeams = function() {
                $dialogs.teamsImport.show = true;
                $dialogs.teamsImport.onClose = () => {
                    $scope.teams = $teams._rawTeams;
                }
            };

            $stages.init().then(function() {
                $scope.stages = $stages._rawStages;
            });

            $scope.stagesTableConfig = {
                id: 'stages-table',
                columns: [
                    { field: 'name', header: 'Stage', edit: 'text' },
                    { field: 'rounds', header: '# of rounds', edit: 'text' }
                ],
                actions: [
                    {
                        onClick: (stage) => {
                            if($scope.settings.currentStage === stage.id) {
                                return;
                            }
                            $scope.settings.currentStage = stage.id;
                            $settings.save();
                            $scores.broadcastRanking(stage);
                        },
                        icon: 'input',
                        tooltip: 'set as current stage'
                    }, {
                        onClick: (stage) => {
                            $stages.remove(stage.id);
                            $stages.save();
                        },
                        classes: () => 'btn-danger',
                        icon: 'delete',
                        tooltip: 'delete',
                        requireLoading: true
                    }, {
                        onClick: (stage) => {
                            $stages.moveStage(stage, -1);
                            $stages.save();
                        },
                        show: (stage) => $scope.stages.indexOf(stage) !== 0,
                        icon: 'arrow_upward',
                        tooltip: 'move before'
                    }, {
                        onClick: (stage) => {
                            $stages.moveStage(stage, 1);
                            $stages.save();
                        },
                        show: (stage) => $scope.stages.indexOf(stage) !== $scope.stages.length - 1,
                        icon: 'arrow_downward',
                        tooltip: 'move after'
                    }
                ],
                edit: {
                    onSave: () => {
                        $stages.save()
                    }
                },
                create: {
                    message: 'New stage',
                    save: (newStage) => {
                        if(isNaN(newStage.rounds)) {
                            alert('Stage\' rounds must be a number')
                            return;
                        }
                        newStage.id = newStage.name.replace(' ', '_');
                        newStage.rounds = parseInt(newStage.rounds) || 0;
                        $stages.add(newStage);
                        $stages.save();
                    }
                },
                row: {
                    classes: (stage) => `stage_${stage.id}`
                },
                sort: (stage1, stage2) => $scope.stages.indexOf(stage1) - $scope.stages.indexOf(stage2)
            };

            $message.on('settings:currentStage',function(data){
               $settings.settings.currentStage = data;
            },true);

            $settings.init().then(function() {
                $scope.settings = $settings.settings;
            });

            $scope.refereesTableConfig = {
                id: 'referees-table',
                columns: [
                    { field: 'name', header: 'Referees', edit: 'text' }
                ],
                actions: [
                    {
                        onClick: (ref) => {
                            let index = $scope.settings.referees.indexOf(ref);
                            $scope.settings.referees.splice(index, 1);
                            $settings.save();
                        },
                        classes: () => 'btn-danger',
                        icon: 'delete',
                        tooltip: 'delete',
                        requireLoading: true
                    }
                ],
                edit: {
                    onSave: () => {
                        $settings.save()
                    }
                },
                create: {
                    message: 'New referee',
                    save: (newRef) => {
                        $scope.settings.referees.push(newRef);
                        $settings.save();
                    }
                },
                row: {
                    classes: (ref) => `ref_${ref.name.replace(' ', '_')}`
                }
            };

            $scope.tablesTableConfig = {
                id: 'tables-table',
                columns: [
                    { field: 'name', header: 'Tables', edit: 'text' }
                ],
                actions: [
                    {
                        onClick: (table) => {
                            let index = $scope.settings.tables.indexOf(table);
                            $scope.settings.tables.splice(index, 1);
                            $settings.save();
                        },
                        classes: () => 'btn-danger',
                        icon: 'delete',
                        tooltip: 'delete',
                        requireLoading: true
                    }
                ],
                edit: {
                    onSave: () => {
                        $settings.save()
                    }
                },
                create: {
                    message: 'New table',
                    save: (newTable) => {
                        $scope.settings.tables.push(newTable);
                        $settings.save();
                    }
                },
                row: {
                    classes: (table) => `table_${table.name.replace(' ', '_')}`
                }
            };

            $challenge.getChallenges().then(challenges => {
                $scope.challenges = challenges;
            });

            $scope.saveSettings = function() {
                $settings.save();
            };
        }
    ]);
});
