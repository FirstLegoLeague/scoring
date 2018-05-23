define('controllers/TeamImportDialogController', [
    'ng-file-upload',
    'services/ng-teams',
    'services/dialogs',
    'angular'
], function () {
    var moduleName = 'TeamImportDialog';

    return angular.module(moduleName, ['ngFileUpload']).controller('TeamImportDialogController', [
        '$scope', '$dialogs', '$teams',
        function ($scope, $dialogs, $teams) {
            var BRIAN_LEES_SCHEDULER_FORMAT = /^Version Number,\d+,*\s+Block Format,\d+,*\s+Number of Teams,(\d+),*\s+((.|\s)*)$/;
            var BRIAN_LEES_SCHEDULER_DELIMITER = ',';

            $scope.parseData = function() {
                if(!$scope.importRaw) {
                    $scope.importLines = [];
                    $scope.importNumberExample = '';
                    $scope.importNameExample = '';
                    return;
                }

                //parse raw import, split lines
                var lines = $scope.importRaw.match(/[^\r\n]+/g);
                var headerLength = $scope.headerLength ? $scope.headerLength : 0;
                var delimeter = $scope.useCustomDelimiter && $scope.delimiter ? $scope.delimiter : '\t';
                var valuePattern = new RegExp(`(\\${delimeter}|\\r?\\n|\\r|^)(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^\"\\${delimeter}\\r\\n]*))`, 'gi');
                lines.splice(0, headerLength);
                lines = lines.map(line => {
                    var values = [];
                    var match;
                    while(match = valuePattern.exec(line)) {
                        values.push(match[2] || match[3]); // qouted value or unqouted value
                    }
                    return values;
                }).map(parsedLine => {
                    var number = parsedLine[$scope.importNumberColumn - 1];
                    var name = parsedLine[$scope.importNameColumn - 1];
                    var name = name.charAt(0).toUpperCase() + name.slice(1);
                    return [number, name];
                });

                lines = lines.filter(parsedLine => parsedLine[$scope.importNumberColumn - 1] !== ""); //filter lines which don't contain a team- we do this by looking for a team number

                if (lines[0]) {
                    $scope.importNumberExample = lines[0][$scope.importNumberColumn - 1];
                    $scope.importNameExample = lines[0][$scope.importNameColumn - 1];
                } else {
                    $scope.importNumberExample = '';
                    $scope.importNameExample = '';
                }

                $scope.importLines = lines;
            }

            $scope.upload = function (files, file) {
                if (file === null) {
                    //this means a non-csv file was uploaded, ignore
                    return;
                }
                var reader = new FileReader();
                reader.onload = (event) => {
                    // Checking special case for Brian Lee's scheduler program
                    var data = event.target.result;
                    var brianLeesFormattedData = data.match(BRIAN_LEES_SCHEDULER_FORMAT);
                    if (brianLeesFormattedData) {
                        $scope.useCustomDelimiter = true;
                        $scope.delimiter = BRIAN_LEES_SCHEDULER_DELIMITER;
                        $scope.headerLength = 0;
                        var teamCount = parseInt(brianLeesFormattedData[1]); //regex has two group matches: the first matches the team count in the file
                        var lines = brianLeesFormattedData[2].split("\n");//the second group matchs the rest of the file, without the header- but including some other irrelevant data in the end
                        $scope.importRaw = lines.splice(0, teamCount).join("\n");//from that group, we take an amount of lines matching the amount of teams, and join those to build the import string
                    } else {
                        $scope.useCustomDelimiter = true;
                        $scope.delimiter = ",";
                        $scope.importRaw = data;
                    }
                    $scope.parseData();
                };
                reader.readAsText(file);

            };

            $scope.save = function () {
                var closeDialog = true;
                var teams = $scope.importLines.map(function (line) {
                    return {
                        number: line[0],
                        name: line[1]
                    };
                });

                if (teams) {
                    try {
                        $teams.clear();
                        teams.forEach(function(team) {
                            $teams.add({
                                number: team.number,
                                name: team.name
                            });
                        });
                        $teams.save();
                    } catch(e) {
                        alert(`An error acoured trying to save the teams: ${e.message}`);
                        closeDialog = false;
                    }
                }

                if(closeDialog) {
                    $scope.close();
                    $scope.dialog.onClose ? $scope.dialog.onClose() : undefined;
                }
            };

            $scope.dialog = $dialogs.teamsImport;

            $scope.close = function () {
                reset();
                $scope.dialog.show = false;
            };

            function reset() {
                $scope.importRaw = '';
                $scope.useCustomDelimiter = false;
                $scope.delimiter = '';
                $scope.headerLength = 0;
                $scope.importNumberColumn = 1;
                $scope.importNameColumn = 2;
            }

            reset();
        }
    ]);
});
