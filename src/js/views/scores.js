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
            $scope.scoresTablesort = $scope.scoresTableKeys[0];
            $scope.scoresReverse = true;
            $scope.search = '';

            $scope.ranksTableKeys = [
                { key: 'rank', header: '#' },
            ];
            $scope.ranksTableSort = $scope.ranksTableKeys[0];
            $scope.ranksReverse = true;

            $scope.exportFiles = {};

            $scope.setScoresTableSort = function(key) {
                if($scope.scoresTablesort === key)
                    $scope.scoresReverse = !$scope.scoresReverse;
                else
                    $scope.scoresTablesort = key;
            };

            $scope.setRanksTableSort = function(key) {
                if($scope.ranksTableSort === key)
                    $scope.ranksReverse = !$scope.ranksReverse;
                else
                    $scope.ranksTableSort = ranksReverse;
            };

            $scope.scoresSortIcon = function (key) {
                if($scope.sort !== key) {
                    return '';
                }

                if ($scope.scoresReverse) {
                    return 'arrow_drop_down';
                } else {
                    return 'arrow_drop_up';
                }
            };

            $scope.scoresSortIcon = function (key) {
                if($scope.sort !== key) {
                    return '';
                }

                if ($scope.ranksReverse) {
                    return 'arrow_drop_down';
                } else {
                    return 'arrow_drop_up';
                }
            };

            function enrichScores(scores) {
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

            function formatRanks(scoreboard) {
                let result = {};
                for(let stageId in scoreboard) {
                    let stage = scoreboard[stageId];
                    result[stageId] = stage.filter(rank => {
                        rank.teamNumber = rank.team.number;
                        rank.teamFullName = `#${rank.team.number} ${rank.team.name}`;
                        rank.highScore = rank.highest ? rank.highest.score : undefined;
                        rank.scores.forEach((score, index) => {
                            if(score) {
                                rank[`round_${index+1}`] = score.score
                            }
                        });
                        return rank.scores.filter(score => score !== undefined).length;
                    });
                }
                return result;
            }

            $scope.$watch(function () {
                return $scores.scores;
            }, function () {
                $scope.scores = enrichScores($scores.scores);
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

            $scope.$watch(() => $scores.scoreboard, function () {
                $scope.scoreboard = formatRanks($scores.scoreboard);
                buildExportFiles();
            }, true);

            $scope.$watch(() => $settings.settings.lineStartString, buildExportFiles);
            $scope.$watch(() => $settings.settings.separatorString, buildExportFiles);
            $scope.$watch(() => $settings.settings.lineEndString, buildExportFiles);

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
                $scope.scoresTableKeys[5].options = $settings.settings.tables.map(table => { return { value: table.name, text: table.name }; });

                $scope.viewedStage = ($settings.settings.currentStage || $scope.stages[0]).id;
                $scope.recalcRanksKeys();
                $scores.getRankings();
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
                $scope.originalValue = score[key.key];
            };

            $scope.cancelEditing = function() {
                $scope.editing.score[$scope.editing.key.key] = $scope.originalValue;
                $scope.editing = undefined;
                delete $scope.originalValue;
            };

            $scope.saveEditing = function() {
                delete $scope.originalValue;
                saveScore($scope.editing.score);
                $scope.editing = undefined;
            };

            $scope.editScoresheet = function (score) {
                $scope.setPage($scope.pages.find(function (p) {return p.name === "scoresheet"}));
                $rootScope.$broadcast("editScoresheet", score)
            };

            $scope.broadcast = function() {
                $scores.broadcastRanking($stages.get($scope.viewedStage));
            };

            $scope.recalcRanksKeys = function() {
                $scope.ranksTableKeys = [
                    { key: 'rank', header: '#' },
                    { key: 'teamNumber', header: 'team' },
                    { key: 'teamFullName', header: 'team' },
                    { key: 'highScore', header: 'high' },
                ];
                for(var i = 1; i <= $stages.get($scope.viewedStage).rounds; i++) {
                    $scope.ranksTableKeys.push({ key: `round_${i}`, header: `round ${i}` })
                }
                $scope.ranksTableSort = $scope.ranksTableKeys[0];
                $scope.ranksReverse = true;
            };

            function saveScore(score, forceAutoBroadcast) {
                try {
                    $scores.update(score, forceAutoBroadcast);
                } catch(e) {
                    $window.alert("Error updating score: " + e);
                }
            }

            function buildExportFiles() {
                Object.keys($scope.scoreboard).forEach(function (stageID) {
                    var teams = $scope.scoreboard[stageID];
                    teams = teams.map(function (teamEntry) {
                        return [teamEntry.rank, teamEntry.team.number,
                            teamEntry.team.name, teamEntry.highest.score].concat(teamEntry.scores);
                    });
                    $scope.exportFiles[stageID] = "data:text/csv;charset=utf-8,"+encodeURIComponent(encodeArray(teams));
                });
            };

            function encodeArray(array) {
                var string = "";
                var settings = $settings.settings;
                array.forEach(function (row) {
                    row = row.map((elem) => elem || elem === 0 ? String(elem) : "");
                    string = string.concat(settings.lineStartString ? String(settings.lineStartString) : "");
                    string = string.concat(row.join(settings.separatorString ? String(settings.separatorString) : ""));
                    string = string.concat((settings.lineEndString ? String(settings.lineEndString) : "") + "\r\n");
                });
                return string;
            };

        }]);
});
