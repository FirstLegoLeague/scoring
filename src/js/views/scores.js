define('views/scores', [
    'services/log',
    'services/ng-scores',
    'directives/really',
    'angular'
], function (log) {
    var moduleName = 'scores';
    return angular.module(moduleName, ['filters', 'ui.bootstrap']).controller(moduleName + 'Ctrl', [
        '$scope', '$scores', '$teams', '$stages', '$settings', '$window', '$rootScope',
        function ($scope, $scores, $teams, $stages, $settings, $window, $rootScope) {
            log('init scores ctrl');

            $scope.scoresTableKeys = [
            { key: 'index', header: '#', editable: false },
            { key: 'teamNumber', header: 'team', editable: 'options', savableValueKey: 'teamNumber' },
            { key: 'teamFullName', header: 'team', editable: 'options', savableValueKey: 'teamNumber' },
            { key: 'match', header: 'match', editable: 'complex-options', onChange: score => {
                let split = score.match.split(' #');
                score.stageId = split[0];
                score.round = parseInt(split[1]);
            } },
            { key: 'referee', header: 'Referee', editable: 'options', savableValueKey: 'referee' },
            { key: 'table', header: 'Table', editable: 'options', savableValueKey: 'table' },
            { key: 'score', header: 'score', editable: 'text', savableValueKey: 'score' }
            ];
            $scope.sort = $scope.scoresTableKeys[0];
            $scope.rev = true;
            $scope.search = '';

            $scope.setSort = function(key) {
                if($scope.sort === key)
                    $scope.rev = !$scope.rev;
                else
                    $scope.sort = key;
            };

            $scope.sortIcon = function (key) {
                if($scope.sort !== key) {
                    return '';
                }

                if ($scope.rev) {
                    return 'arrow_drop_down';
                } else {
                    return 'arrow_drop_up';
                }
            };

            function enrich(scores) {
                return scores.map((score, index) => {
                    var enrichedScore = {};
                    for(var key in score) enrichedScore[key] = score[key];
                    enrichedScore.index = index + 1;
                    enrichedScore.team = $teams.get(score.teamNumber);
                    enrichedScore.stage = $stages.get(score.stageId);

                    enrichedScore.teamFullName = `#${enrichedScore.team.number} ${enrichedScore.team.name}`;
                    enrichedScore.match = `${enrichedScore.stage.id} #${enrichedScore.round}`;
                    return enrichedScore;
                });
            }

            $scope.$watch(function () {
                return $scores.scores;
            }, function () {
                $scope.scores = enrich($scores.scores);
            }, true);

            $scope.$watch(function () {
                return $teams.teams;
            }, function (newValue, oldValue) {
                if (newValue !== oldValue && indexIsTeamNum(newValue)) {
                    $scope.scores.forEach(function (score) {
                        score.team = $teams.get(score.teamNumber);
                    });
                    $scores._update();
                }

                $scope.scoresTableKeys[1].options = $teams.teams.map(team => { return { value: team.number, text: team.number }; });
                $scope.scoresTableKeys[2].options = $teams.teams.map(team => { return { value: team.number, text: `#${team.number} ${team.name}` }; });
            }, true);

            function indexIsTeamNum(teamMap) {
                return !Object.keys(teamMap).some((key)=>{
                    return `${teamMap[key].number}` !== key;
                });
            }

            $scores.init().then(function() {
                $scope.stages = $stages.stages;

                $scope.scoresTableKeys[1].options = $teams.teams.map(team => { return { value: team.number, text: team.number }; });
                $scope.scoresTableKeys[2].options = $teams.teams.map(team => { return { value: team.number, text: `#${team.number} ${team.name}` }; });
                $scope.scoresTableKeys[3].options = [];
                $scope.stages.forEach(stage => {
                    for(var round = 1; round <= stage.rounds; round++) {
                        let match = `${stage.id} #${round}`;
                        $scope.scoresTableKeys[3].options.push({ value: match, text: match });
                    }
                });
                $scope.scoresTableKeys[4].options = $settings.settings.referees.map(ref => { return { value: ref.name, text: ref.name }; });
                $scope.scoresTableKeys[5].options = $settings.settings.referees.map(table => { return { value: table.name, text: table.name }; });
            });

            $scope.togglePublished = function(score) {
                score.published = !score.published;
                saveScore(score);
            };

            $scope.deleteScore = function(score) {
                $scores.delete(score);
            };

            $scope.isEditing = function(score, key) {
                if(key.editable) {
                    return $scope.editing && $scope.editing.score === score && $scope.editing.key === key;
                }
            };

            $scope.startEditing = function(score, key) {
                $scope.editing = { score: score, key: key };
                $scope.originalValue = score[key];
            };

            $scope.cancelEditing = function() {
                $scope.editing.score[$scope.editing.key] = $scope.originalValue;
                $scope.editing = undefined;
                delete $scope.originalValue;
            };

            $scope.saveEditing = function() {
                delete $scope.originalValue;
                saveScore($scope.editing.score);
            };

            function saveScore(score, forceAutoBroadcast) {
                try {
                    $scores.update(score, forceAutoBroadcast);
                } catch(e) {
                    $window.alert("Error updating score: " + e);
                }
            }

            $scope.cancelEditScore = function (score) {
                score.$editing = false;
            };

            $scope.refresh = function () {

            }
            $scope.editScoresheet = function (score) {
                $scope.setPage($scope.pages.find(function (p) {return p.name === "scoresheet"}));
                $rootScope.$broadcast("editScoresheet", score)
            };

            $scope.refresh = function() {
                $scores.load();
            };
        }]);
});
