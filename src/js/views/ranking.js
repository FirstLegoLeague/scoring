"use strict";

define('views/ranking',[
    'services/log',
    'services/ng-scores',
    'services/ng-handshake',
    'services/ng-message',
    'services/ng-settings',
    'angular'
],function(log) {
    var moduleName = 'ranking';
    return angular.module(moduleName,[]).controller(moduleName+'Ctrl', [
        '$scope', '$scores', '$stages','$handshake','$message', '$settings',
        function($scope, $scores, $stages, $handshake, $message, $settings) {
            log('init ranking ctrl');

            $scope.scores = $scores;

            function removeEmptyRanks(scoreboard) {
                let result = {};
                for(let stageId in scoreboard) {
                    let stage = scoreboard[stageId];
                    result[stageId] = stage.filter(rank => rank.scores.filter(score => score !== undefined).length);
                }
                return result;
            }

          $settings.init();

          $scope.$watch(function() {
                return $scores.scoreboard;
            }, function () {
                $scope.scoreboard = removeEmptyRanks($scores.scoreboard)
            }, true);

            $stages.init().then(function () {
                $scope.stages = $stages.stages;
                $scope.stages.forEach(function (stage) {
                    stage.sort = 'rank';
                    stage.rev = false;
                });
            });

            $scores.init().then(function() {
                return $scores.getRankings();
            });

            $scope.exportRanking = function() {
                $handshake.$emit('exportRanking',{
                    scores: $scope.scores,
                    stages: $scope.stages
                });
            };


            $scope.doSort = function(stage, col, defaultSort) {
                if (stage.sort === undefined) {
                    stage.sort = $scope.sort;
                    stage.rev = $scope.rev;
                }
                stage.rev = (String(stage.sort) === String(col)) ? !stage.rev : defaultSort;
                stage.sort = col;
            };

            $scope.sortIcon = function(stage, col){
                if(!angular.equals(stage.sort, col)){
                    return '';
                }
                if (stage.rev) {
                    return 'arrow_drop_down';
                } else {
                    return 'arrow_drop_up';
                }
            };

            $scope.toggle = function(stage) {
                stage.$collapsed = !stage.$collapsed;
            };

            $scope.maxRounds = function() {
                return $stages.stages.reduce(function(max,stage) {
                    return Math.max(max, stage.$rounds.length);
                },0);
            };

            //return an array with the number of empty columns to render for a stage
            //max rounds minus stage rounds
            $scope.emptyCols = function(stage) {
                return new Array($scope.maxRounds() - stage.$rounds.length);
            };
        }
    ]);
});
