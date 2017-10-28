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

            $scope.teams = {
                show: true
            };

            $scope.teamsTableKeys = [
                { key: 'number', header: 'Number' },
                { key: 'name', header: 'Name' },
                { key: 'cityState', header: 'City & State' },
                { key: 'country', header: 'Country' },
                { key: 'affiliation', header: 'Affiliation' },
                { key: 'coach1', header: 'Coach 1' },
                { key: 'coach2', header: 'Coach 1' },
                { key: 'judgingGroup', header: 'Judging Group' },
                { key: 'pitLocation', header: 'Pit location' },
                { key: 'translationNeeded', header: 'Need translation?' },
            ];
            $scope.teamsTableSort = $scope.teamsTableKeys[0];
            $scope.teamsReverse = false;
            $scope.newTeam = {};

            $teams.init().then(function() {
                $scope.teams = $teams._rawTeams;
            });

            $scope.saveNewTeam = function() {
                $teams.add($scope.newTeam);
                $teams.save();
                $scope.newTeam = {};
            };

            $scope.deleteTeam = function(team) {
                $teams.remove(team.number);
                $teams.save();
            };

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

            $scope.teamsTableSort = $scope.teamsTableKeys[0];
            $scope.teamsReverse = false;
            $scope.newTeam = {};
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
