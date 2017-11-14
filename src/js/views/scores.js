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

            $scope.scoresTableConfig = {
                columns: [
                    { field: 'index', header: '#', edit: false },
                    { field: 'teamNumber', header: 'team', edit: 'options', options: [], writeField: 'teamNumber', show: (score) => !score.showError },
                    { field: 'teamFullName', header: 'team', edit: 'options', options: [], writeField: 'teamNumber', show: (score) => !score.showError },
                    { field: 'match', header: 'match', edit: 'complex_options', options: [], onChange: (score) => {
                            let split = score.match.split(' #');
                            score.stageId = split[0];
                            score.round = parseInt(split[1]);
                        }
                        , show: (score) => !score.showError
                    },
                    { field: 'referee', header: 'Referee', edit: 'options', options: [], writeField: 'referee', show: (score) => !score.showError },
                    { field: 'table', header: 'Table', edit: 'options', options: [], writeField: 'table', show: (score) => !score.showError },
                    { field: 'score', header: 'score', edit: 'text', writeField: 'score', show: (score) => !score.showError },
                    { field: 'error', show: (score) => score.showError, value: (score) => score.error ? score.error.message : '' }
                ],
                actions: [
                    {
                        onClick: (score) => {
                            score.showError = !score.showError
                        },
                        classes: () => 'btn-danger',
                        show: (score) => score.error,
                        icon: 'error'
                    }, {
                        onClick: (score) => {
                            togglePublished(score);
                        },
                        show: (score) => score.published,
                        icon: 'remove_circle_outline'
                    }, {
                        onClick: (score) => {
                            togglePublished(score);
                        },
                        show: (score) => !score.published,
                        icon: 'add_circle_outline'
                    }, {
                        onClick: (score) => {
                            $scope.setPage($scope.pages.find(function (p) {return p.name === "scoresheet"}));
                            $rootScope.$broadcast("editScoresheet", score);
                        },
                        icon: 'edit'
                    }, {
                        onClick: (score) => {
                            saveScore(score);
                        },
                        classes: () => 'btn-danger',
                        icon: 'delete'
                    }
                ],
                edit: {
                    onSave: (score) => {
                        $scores.update(score);
                    }
                },
                row: {
                    classes: (score) => `score_${score.index}`
                },
                search : () => $scope.scoresTableConfig.searchValue,
                searchValue: ''
            };

            $scope.ranksTableKeys = [
                { key: 'rank', header: '#' },
            ];
            $scope.ranksTableSort = $scope.ranksTableKeys[0];
            $scope.ranksReverse = true;

            $scope.exportFiles = {};

            $scope.setRanksTableSort = function(key) {
                if($scope.ranksTableSort === key)
                    $scope.ranksReverse = !$scope.ranksReverse;
                else
                    $scope.ranksTableSort = ranksReverse;
            };

            function formatScores(scores) {
                return scores.map((score, index) => {
                    var formattedScore = {};
                    for(var key in score) formattedScore[key] = score[key];
                    formattedScore.index = index + 1;
                    formattedScore.team = $teams.get(score.teamNumber);
                    formattedScore.stage = $stages.get(score.stageId);

                    if(formattedScore.team) {
                        formattedScore.teamFullName = `#${formattedScore.team.number} ${formattedScore.team.name}`;
                    }
                    if(formattedScore.stage) {
                        formattedScore.match = `${formattedScore.stage.id} #${formattedScore.round}`;
                    }
                    return formattedScore;
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

            $scope.$watch(() => $scores.scores, function () {
                $scope.scores = formatScores($scores.scores);
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

                $scope.scoresTableConfig.columns[1].options = $teams.teams.map(team => { return { value: team.number, text: team.number }; });
                $scope.scoresTableConfig.columns[2].options = $teams.teams.map(team => { return { value: team.number, text: `#${team.number} ${team.name}` }; });
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
                $scope.scores = formatScores($scores.scores);

                $scope.scoresTableConfig.columns[1].options = $teams.teams.map(team => { return { value: team.number, text: team.number }; });
                $scope.scoresTableConfig.columns[2].options = $teams.teams.map(team => { return { value: team.number, text: `#${team.number} ${team.name}` }; });
                $scope.stages.forEach(stage => {
                    for(var round = 1; round <= stage.rounds; round++) {
                        let match = `${stage.id} #${round}`;
                        $scope.scoresTableConfig.columns[3].options.push({ value: match, text: match });
                    }
                });
                $scope.scoresTableConfig.columns[4].options = $settings.settings.referees.map(ref => { return { value: ref.name, text: ref.name }; });
                $scope.scoresTableConfig.columns[5].options = $settings.settings.tables.map(table => { return { value: table.name, text: table.name }; });

                $scope.viewedStage = ($settings.settings.currentStage || $scope.stages[0]).id;
                $scope.recalcRanksKeys();
                $scores.getRankings();
            });

            function togglePublished(score) {
                score.published = !score.published;
                saveScore(score, true);
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
