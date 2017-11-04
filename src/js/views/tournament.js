define('views/tournament', [
    'services/log',
    'services/ng-handshake',
    'services/ng-stages',
    'services/ng-teams',
    'services/ng-settings',
    'services/ng-challenge',
    'controllers/TeamImportDialogController',
    'angular'
], function (log) {
    var moduleName = 'tournament';
    return angular.module(moduleName, ['TeamImportDialog']).controller(moduleName + 'Ctrl', [
        '$scope', '$stages', '$teams', '$settings','$challenge','$handshake',
        function ($scope, $stages, $teams, $settings,$challenge, $handshake) {
            log('init tournament ctrl');

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
                    { field: 'coach2', header: 'Coach 1',      edit: 'text' },
                    { field: 'judgingGroup', header: 'Judging Group',edit: 'text' },
                    { field: 'pitLocation', header: 'Pit location', edit: 'text' },
                    { field: 'translationNeeded', header: 'Translation?', edit: 'text' },
                ],
                actions: [
                    {
                        onClick: (team) => {
                            $teams.remove(team.number);
                            $teams.save();
                        },
                        classes: () => 'btn-danger',
                        icon: 'delete'
                    }
                ],
                edit: {
                    onSave: () => {
                        $teams.save();
                    }
                },
                create: {
                    message: 'Add new team',
                    save: (newTeam) => {
                        $teams.add(newTeam);
                        $teams.save();
                    }
                },
                row: {
                    classes: (team) => `team_${team.number}`
                },
                search : () => $scope.teamsSearch
            };

            $teams.init().then(function() {
                $scope.teams = $teams._rawTeams;
            });

            $scope.teamsSearch = '';

            $scope.importTeams = function() {
                $handshake.$emit('importTeams').then(function(result) {
                    if (result) {
                        $teams.clear();
                        result.teams.forEach(function(team) {
                            $teams.add({
                                number: team.number,
                                name: team.name
                            });
                        });
                        $scope.status = '';
                    }
                });
            }

            $stages.init().then(function() {
                $scope.stages = $stages._rawStages;
            });

            $scope.stagesTableConfig = {
                id: 'stages-table',
                columns: [
                    { field: 'name', header: 'Name', edit: 'text' },
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
                        },
                        icon: 'input'
                    }, {
                        onClick: (stage) => {
                            $stages.remove(stage.id);
                            $stages.save();
                        },
                        classes: () => 'btn-danger',
                        icon: 'delete'
                    }
                ],
                edit: {
                    onSave: () => {
                        $settings.save()
                    }
                },
                create: {
                    message: 'New stage',
                    save: (newStage) => {
                        newStage.id = newStage.name.replace(' ', '_');
                        newStage.rounds = newStage.rounds || 0;
                        $scope.stages.push(newStage);
                        $stages.save();
                    }
                },
                row: {
                    classes: (stage) => `stage_${stage.id}`
                },
                disableSort: true
            };

            $settings.init().then(function() {
                $scope.settings = $settings.settings;
            });

            $scope.refereesTableConfig = {
                id: 'referees-table',
                columns: [
                    { field: 'name', header: 'Name', edit: 'text' }
                ],
                actions: [
                    {
                        onClick: (ref) => {
                            let index = $scope.settings.referees.indexOf(ref);
                            $scope.settings.referees.splice(index, 1);
                            $settings.save();
                        },
                        classes: () => 'btn-danger',
                        icon: 'delete'
                    }
                ],
                edit: {
                    onSave: () => $settings.save()
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
                    { field: 'name', header: 'Name', edit: 'text' }
                ],
                actions: [
                    {
                        onClick: (table) => {
                            let index = $scope.settings.tables.indexOf(table);
                            $scope.settings.tables.splice(index, 1);
                            $settings.save();
                        },
                        classes: () => 'btn-danger',
                        icon: 'delete'
                    }
                ],
                edit: {
                    onSave: () => $settings.save()
                },
                create: {
                    message: 'New referee',
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
