define('views/scoresheet',[
    'services/log',
    'services/fs',
    'services/ng-fs',
    'services/ng-challenge',
    'services/ng-scores',
    'services/ng-teams',
    'services/ng-stages',
    'services/ng-settings',
    'directives/sigpad',
    'directives/spinner',
    'angular'
], function(log, fs) {
    var moduleName = 'scoresheet';

    return angular.module(moduleName, []).controller(moduleName + 'Ctrl', [
        '$document','$scope','$fs','$stages','$scores','$score','$settings','$challenge','$window','$q','$teams',
        function($document, $scope,$fs,$stages,$scores,$score,$settings,$challenge,$window,$q,$teams) {
            log('init scoresheet ctrl');

            const AUTOSCROLL_SPEED = 0.1;

            $scope.selectTeam = function(team) {
                $scope.scoreEntry.team = team
                $scope.fillStageRound(team);
            };

            $scope.teamChoosingTableConfig = {
                columns: [
                    { field: 'number', header: '#', onCellClick: $scope.selectTeam },
                    { field: 'name', header: 'Name', onCellClick: $scope.selectTeam },
                ],
                row: {
                    classes: team => team === $scope.scoreEntry.team ? 'selected' : ''
                }
            }

            // Set up defaults
            $scope.settings = {};
            $scope.missions = [];
            $scope.strings = [];

            // add teams and stages to scope for selection
            $scope.teams = $teams.teams;
            $scope.stages = $stages.stages;
            $scope.scores = $scores.scores;

            $scope.completedScores = [];

            $scope.step = 'intro';

            $scope.load = function() {
                return $settings.init()
                .then(function(res) {
                    $scope.settings = res;
                    return $challenge.load($scope.settings.challenge);
                })
                .then(function(defs) {
                    $scope.field = defs.field;
                    $scope.rtlLang = $scope.field.rtl || false;
                    $scope.missions = defs.missions;
                    $scope.strings = defs.strings;
                    $scope.objectiveIndex = defs.objectiveIndex;
                    angular.forEach($scope.missions,process);
                }).catch(function() {
                    //could not read field locally or remotely
                    $scope.errorMessage = 'Could not load field, please configure host in settings';
                    $window.alert($scope.errorMessage);
                });
            };

            $scope.load();

            $scope.getString = function(key) {
                return $scope.strings[key]||key;
            };

            $scope.moveOn = function(step) {
                $scope.step = step;
                requestAnimationFrame(() => {
                    let scrollElements = $document.context.getElementsByClassName('reset-scroll');
                    for(var i = 0; i < scrollElements.length; i++) {
                        scrollElements[i].scrollTop = 0;
                    }
                });
            };

            $scope.rounds = function(stage) {
                let rounds = [];
                for(var i = 0; i < stage.rounds; i++) {
                    rounds.push(i+1);
                }
                return rounds;
            };

            $scope.selectStageAndRound = function(stage, round) {
                $scope.scoreEntry.stage = stage;
                $scope.scoreEntry.round = round;
            };

            $scope.isStageAndRoundSelected = function(stage, round) {
                return $scope.scoreEntry.stage === stage && $scope.scoreEntry.round === round;
            };

            $scope.isDoneRound = function(stage, round) {
                return $scope.completedScores.some(score => score.round === round && score.stageId === stage.id);
            };

            $scope.roundScore = function(stage, round) {
                return $scope.completedScores.find(score => score.round === round && score.stageId === stage.id).score;
            };

            function getObjectives(names) {
                return names.map(function(dep) {
                    return $scope.objectiveIndex[dep].value;
                });
            }

            function process(mission) {
                var deps = mission.score.reduce(function(all,score) {
                    return all.concat($challenge.getDependencies(score));
                },[]);
                mission.errors = [];
                mission.percentages = [];
                mission.completed = false;
                //add watcher for all dependencies
                $scope.$watch(function() {
                    return deps.map(function(dep) {
                        return $scope.objectiveIndex[dep].value;
                    }).join('|');
                },function(newValue) {
                    mission.errors = [];
                    mission.percentages = [];
                    mission.completedObjectives = [];
                    mission.result = mission.score.reduce(function(total,score,i) {
                        var deps = $challenge.getDependencies(score);
                        var vars = getObjectives(deps);
                        var res = score.apply(null,vars);
                        mission.completedObjectives[i] = (res !== undefined);
                        if (res instanceof Error) {
                            mission.errors.push(res);
                            //do not count this bit
                            return total;
                        }
                        //check for fraction. TODO: work with Percentage object
                        if (typeof res === 'number' && (res % 1) !== 0) {
                            mission.percentages.push(res);
                            //do not count
                            return total;
                        }
                        return total + (res||0);
                    },0);
                    mission.completed = mission.completedObjectives.every(function(objectCompleted) {
                        return objectCompleted;
                    }) && mission.errors.length === 0;
                    if(mission.completed && !mission.previouslyCompleted) {
                        scrollToNextMission(mission);
                    }
                    mission.previouslyCompleted = mission.completed;
                });

            }

            function scrollToNextMission(mission) {
                let className = mission.title.substr(0, mission.title.indexOf(' '));
                let missionsElement = $document.context.getElementById('missions');
                let missionElement = missions.getElementsByClassName(className)[0];
                if(!missionElement) {
                    return;
                }

                let startingPosition = missionsElement.scrollTop;
                let endingPosition = Math.min(missionElement.offsetTop + missionElement.clientHeight - 150,
                                            missionsElement.scrollHeight - missionsElement.clientHeight);
                let tick = (endingPosition - startingPosition) * AUTOSCROLL_SPEED;

                function scrollTick() {
                    if(missionsElement.scrollTop + tick < endingPosition) {
                        missionsElement.scrollTop += tick;
                        requestAnimationFrame(scrollTick);
                    } else {
                        missionsElement.scrollTop = endingPosition;
                    }
                }
                requestAnimationFrame(scrollTick);
            }

            $scope.score = function() {
                if (!$scope.missions) {return;}
                //step 1: sum all scores from missions without percentages
                var subScore = $scope.missions.filter(function(m) {
                    return m.percentages.length === 0;
                }).reduce(function(total,m) {
                    return total + m.result;
                },0);
                //step 2: sum all percentages
                var bonus = $scope.missions.filter(function(m) {
                    return m.percentages.length !== 0;
                }).reduce(function(total,m) {
                    //sum of mission percentages
                    return total + m.percentages.reduce(function(total,perc) {
                        return total + perc;
                    },0);
                },1);   //add 1 for multiplication later on
                //step 3: apply percentages
                var bonusScore = Math.ceil(subScore * bonus);
                //step 4: add points from missions with percentages
                var restScore = $scope.missions.filter(function(m) {
                    return m.percentages.length !== 0;
                }).reduce(function(total,m) {
                    return total + m.result;
                },0);

                return bonusScore + restScore;
            };

            function empty(val) {
                return val === undefined || val === null;
            }

            $scope.missionsErrors = function() {
                if (!$scope.missions) {return [];}
                let list = [];

                let errors =  $scope.missions.some(function(mission) {
                    return !!mission.errors.length;
                });

                let incomplete = $scope.missions.some(function(mission) {
                    return mission.objectives.some(function(objective) {
                        return empty(objective.value);
                    });
                });

                if (errors) {
                    list.push('Some missions have errors');
                }
                if (incomplete) {
                    list.push('Some missions are incomplete');
                }

                return list;
            };

            //lists reasons why the scoresheet cannot be saved
            $scope.preventSaveErrors = function() {
                let list = $scope.missionsErrors();

                if(!$scope.scoreEntry.signature) {
                    list.push('No signature');
                }

                return list;
            };

            $scope.isSavable = function() {
                if (!$scope.missions) {return false;}

                return !$scope.preventSaveErrors().length;
            };

            $scope.clear = function() {

                var table = $scope.scoreEntry ? $scope.scoreEntry.table : undefined;
                var referee = $scope.scoreEntry ? $scope.scoreEntry.referee : undefined;
                $scope.scoreEntry = new $score({ table: table, referee: referee });
                $scope.scoreEntry.signature = null;
                $scope.missions.forEach(function(mission) {
                    mission.objectives.forEach(function(objective) {
                        delete objective["value"];
                    });
                });

                if($scope.editingScore){
                    $scope.setPage($scope.pages.find(function (p) {return p.name === "scores"}));
                    $scope.editingScore = false;
                }
                log('scoresheet cleared');
            };

            $scope.saveEdit = function () {
                $scope.setPage($scope.pages.find(function (p) {return p.name === "scores"}));//When you finish editing a scoresheet, it returns you to the scores view
                $scores.delete($scope.scoreEntry);
                return $scores.loadScoresheet($scope.scoreEntry).then(function (result) {
                    result.missions.forEach(function (mission) {
                        var changedMission = $scope.missions.find(function (e) {return e.title === mission.title});
                        mission.objectives.forEach(function (objective, i) {
                            if(objective["value"] !== changedMission.objectives[i]["value"]){
                                var changedValue;
                                if(objective.options){
                                    changedValue = objective.options.find(function (o) {return o.value === changedMission.objectives[i]["value"]}).title;
                                } else {
                                    changedValue = changedMission.objectives[i]["value"];
                                }
                                log(`Changed value of objective ${objective.title} to ${changedValue}`);
                            }
                        });
                    });
                    result.team.number !== $scope.scoreEntry.team.number ? log(`changed team to (${$scope.scoreEntry.team.number}) ${$scope.scoreEntry.team.name}`) : void(0);
                    result.stage.id !== $scope.scoreEntry.stage.id ? log("changed stage to " + $scope.scoreEntry.stage.name) : void(0);
                    result.round !== $scope.scoreEntry.round ? log("changed round to " + $scope.scoreEntry.round) : void(0);
                    result.table !== $scope.scoreEntry.table ? log("changed table to " + $scope.scoreEntry.table) : void(0);
                    result.referee !== $scope.scoreEntry.referee ? log("changed referee to " + $scope.scoreEntry.referee) : void(0);
                    $scope.scoreEntry.id = $score.generateUniqueId();//This is a different score after being edited, so it has a different id
                    $scope.save()
                });
            };

            //saves mission scoresheet
            $scope.save = function() {
                if(!$scope.isSavable()) {
                    return;
                }

                var scoresheet = angular.copy($scope.field);
                var scoreEntry = new $score($scope.scoreEntry);
                scoresheet.team = $scope.scoreEntry.team;
                scoresheet.stage = $scope.scoreEntry.stage;
                scoresheet.round = $scope.scoreEntry.round;
                scoresheet.table = $scope.scoreEntry.table;
                scoresheet.referee = $scope.scoreEntry.referee;
                scoresheet.signature = $scope.scoreEntry.signature;
                scoreEntry.score = $scope.score();
                scoreEntry.published = $settings.settings.autoPublish || false;
                scoreEntry.calcFilename();

                let message = `Thank you for the score!\n`
                 + `team: #${scoresheet.team.number}, ${scoresheet.stage.name} round ${scoresheet.round}`

                return $scores.create(scoresheet, scoreEntry).then(function() {
                    log('result saved: ');
                    $scope.clear();
                    $scope.moveOn('teams');
                    setTimeout(() => $window.alert(message), 0);
                }).catch(function(err) {
                    log(`Error: ${err}`);
                    $scope.clear();
                    $scope.moveOn('teams');
                    setTimeout(() => $window.alert(message), 0);
                    throw err;
                });
            };

            $scope.fillStageRound = function(team){
                if(!$settings.settings.currentStage){
                    return;
                }
                var currentStageObject = $stages.get($settings.settings.currentStage);
                $scope.completedScores = $scores.scores
                    .filter(score => score.teamNumber === team.number);

                var completedRoundsInCurrentStage = $scope.completedScores
                    .filter(score => score.stageId === currentStageObject.id)
                    .map(score => score.round);

                var firstNotCompleted = currentStageObject.$rounds
                    .find(round => completedRoundsInCurrentStage.indexOf(round) === -1);

                $scope.scoreEntry.stage = currentStageObject;
                $scope.scoreEntry.round = firstNotCompleted;
            }

            $scope.loadScoresheet = function (score) {
                log(`Editing scoresheet: stage ${score.stageId}, round ${score.round}, team ${score.teamNumber}, score ${score.score}`);
                $scope.editingScore = true;
                $scope.scoreEntry = score;
                $scores.loadScoresheet(score).then(function (result) {
                    $scope.scoreEntry.signature = result.signature;
                    $scope.missions.forEach(function (mission) {
                        var filledMission = result.missions.find(function (e) {return e.title === mission.title});
                        mission.objectives.forEach(function (objective, index) {
                            objective["value"] = filledMission.objectives[index]["value"];
                        });
                    });
                });
            };

            $scope.$on("editScoresheet", function (e, score) {
                $scope.loadScoresheet(score);
            });

            // Initialize empty scoresheet (mostly uniqueId)
            $scope.clear();
        }
    ]);
});
