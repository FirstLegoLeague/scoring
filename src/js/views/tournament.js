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

            $scope.sortIcon = function (key) {
                if($scope.sort !== key) {
                    return '';
                }

                if ($scope.teamsReverse) {
                    return 'arrow_drop_down';
                } else {
                    return 'arrow_drop_up';
                }
            };

            $scope.showIcon = function(show) {
                return show ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
            };

            $scope.valueOrPlaceholder = function(object, key) {
                return object[key.key] || 'Add value';
            };

            $scope.isEditing = function(object, key) {
                return $scope.editing && $scope.editing.object === object && $scope.editing.key.key === key.key;
            };

            $scope.startEditing = function(object, key) {
                $scope.editing = { object: object, key: key };
                $scope.originalValue = object[key.key];
            };

            $scope.cancelEditing = function() {
                $scope.editing.object[$scope.editing.key.key] = $scope.originalValue;
                $scope.editing = false;
                delete $scope.originalValue;
            };

            $scope.saveEditing = function(sendToServer) {
                delete $scope.originalValue;
                $scope.editing = false;
                if(sendToServer || sendToServer === undefined) {
                    $teams.save();
                }
            };

            $scope.teamsTableConfig = {
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
                        show: (team) => team !== $scope.newTeam,
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
                }
            };

            $teams.init().then(function() {
                $scope.teams = $teams._rawTeams;
            });

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

            $scope.structure = {
                show: false
            };

            $scope.newStage = {};
            $scope.newRef = {};
            $scope.newTable = {};

            $stages.init().then(function() {
                $scope.stages = $stages._rawStages;
            });

            $scope.deleteStage = function(stage) {
                $stages.remove(stage.id);
                $stages.save();
            };

            $scope.saveNewStage = function() {
                $scope.newStage.id = newStage.name;
                $scope.newStage.rounds = $scope.newStage.rounds || 0;
                $scope.stages.push($scope.newStages);
                $stages.save();
                $scope.newStage = {};
            };

            $scope.setCurrentStage = function(stage) {
                if($scope.settings.currentStage === stage.id) {
                    return;
                }
                $scope.settings.currentStage = stage.id;
                $settings.save();
            }

            $settings.init().then(function() {
                $scope.settings = $settings.settings;
            });

            $scope.deleteRef = function(ref) {
                let index = $scope.settings.referees.indexOf(ref);
                $scope.settings.referees.splice(index, 1);
                $settings.save();
            };

            $scope.saveNewRef = function() {
                $scope.settings.tables.push($scope.newRef);
                $settings.save();
                $scope.newRef = {};
            };

            $scope.deleteTable = function(table) {
                let index = $scope.settings.tables.indexOf(table);
                $scope.settings.tables.splice(index, 1);
                $settings.save();
            };

            $scope.saveNewTable = function() {
                $scope.settings.tables.push($scope.newTable);
                $settings.save();
                $scope.newTable = {};
            };

            $scope.challenge = {
                show: false
            };

            $challenge.getChallenges().then(challenges => {
                $scope.challenges = challenges;
            });

            $scope.saveSettings = function() {
                saveSettings();
            };
        }
    ]);
});
