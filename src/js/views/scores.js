define('views/scores', [
    'services/log',
    'services/ng-scores',
    'directives/really',
    'angular'
], function (log) {
    var moduleName = 'scores';
    return angular.module(moduleName, ['filters', 'ui.bootstrap']).controller(moduleName + 'Ctrl', [
        '$scope', '$scores', '$teams', '$stages', '$window', '$rootScope',
        function ($scope, $scores, $teams, $stages, $window, $rootScope) {
            log('init scores ctrl');

            $scope.scoresTableKeys = [
            {   key: 'index', header: '#'   },
            {   key: 'teamString', header: 'team'   },
            {   key: 'match', header: 'match'   },
            {   key: 'refAndTable', header: 'Referee and Table'   },
            {   key: 'score', header: 'score'   },
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

                    enrichedScore.teamString = `#${enrichedScore.team.number} ${enrichedScore.team.name}`;
                    enrichedScore.match = `#${enrichedScore.round} ${enrichedScore.stage.id}`;
                    enrichedScore.refAndTable = `${enrichedScore.referee} - ${enrichedScore.table}`;
                    return enrichedScore;
                });
            }

            $scope.$watch(function () {
                return $scores.scores;
            }, function () {
                $scope.scores = enrich($scores.scores);
            }, true);

            $scope.$watch(function () {
                return $teams._teamsMap;
            }, function (newValue, oldValue) {
                if (newValue !== oldValue && indexIsTeamNum(newValue)) {
                    $scope.scores.forEach(function (score) {
                        score.team = $teams.get(score.teamNumber);
                    });
                    $scores._update();
                }
            }, true);

            function indexIsTeamNum(teamMap) {
                return !Object.keys(teamMap).some((key)=>{
                    return `${teamMap[key].number}` !== key;
                });
            }

            $scores.init().then(function() {
                $scope.stages = $stages.stages;
            });

            $scope.deleteScore = function (score) {
                $scores.delete(score);
            };

            $scope.editScore = function (score) {
                score.$editing = true;
            };

            $scope.publishScore = function (score) {
                score.published = true;
                saveScore(score);
            };

            $scope.unpublishScore = function(score) {
                var wasPublished = score.published;
                score.published = false;
                saveScore(score, wasPublished);
            };

            $scope.finishEditScore = function (score) {
                // The score entry is edited 'inline', then used to
                // replace the entry in the scores list and its storage.
                // Because scores are always 'sanitized' before storing,
                // the $editing flag is automatically discarded.
                score.$editing = false;
                saveScore(score);
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
