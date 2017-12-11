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
                lines.splice(0, headerLength);
                lines = lines.map(function (line) {
                    if ($scope.useCustomDelimiter) {
                        return line.split($scope.delimiter);
                    }
                    //split by tab character
                    return line.split(/\t/);
                });
                //try to guess names and number columns
                $scope.importNumberColumn = 1;
                $scope.importNameColumn = 2;

                lines = lines.filter((parsedLine) => parsedLine[$scope.importNumberColumn - 1] !== ""); //filter lines which don't contain a team- we do this by looking for a team number

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
                    parseData();
                };
                reader.readAsText(file);

            };

            $scope.save = function () {
                $scope.dialog.show = false;
                var teams = $scope.importLines.map(function (line) {
                    return {
                        number: line[$scope.importNumberColumn - 1],
                        name: line[$scope.importNameColumn - 1]
                    };
                });

                if (teams) {
                    $teams.clear();
                    teams.forEach(function(team) {
                        $teams.add({
                            number: team.number,
                            name: team.name
                        });
                    });
                    $teams.save();
                }
            };

            $scope.dialog = $dialogs.teamsImport;

            $scope.cancel = function () {
                $scope.importRaw = '';
                $scope.parseData();
                $scope.dialog.show = false;
            };
        }
    ]);
});
