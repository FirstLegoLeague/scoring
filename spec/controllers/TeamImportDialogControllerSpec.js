describe('TeamImportDialogController',function() {

    var module = factory('controllers/TeamImportDialogController',{
        'services/log': logMock,
    });

    var $scope, controller, teamsMock;

    beforeEach(function() {
        angular.module("ngFileUpload", []);//this creates an empty "ngFileUpload" module to be required by the team import dialog controller
        //this fine because the only relevance of the FileUpload module is in its directives, which are not used here
        angular.mock.module(module.name);
        angular.mock.inject(function($controller,$rootScope,$q) {
            $scope = $rootScope.$new();
            teamsMock = createTeamsMock([]);
            controller = $controller('TeamImportDialogController', {
                '$scope': $scope,
                '$dialogs': { teamsImport: { show: true } },
                '$teams': teamsMock
            });
        });
    });

    describe('parsing data',function() {
        it('should populate importLines',function() {
            $scope.importLines = [];
            $scope.importRaw = '42\tFooBar\n7\tQuxMoo';
            $scope.parseData();
            expect($scope.importLines).toEqual([
                ['42','FooBar'],
                ['7','QuxMoo']
            ]);
            expect($scope.importNumberExample).toEqual('42');
            expect($scope.importNameExample).toEqual('FooBar');
        });

        it('should skip the amount of lines specified as header',function() {
            $scope.importLines = [];
            $scope.importRaw = 'Number\tName\n7\tQuxMoo\n42\tUniLif';
            $scope.headerLength = 1;
            $scope.parseData();
            expect($scope.importLines).toEqual([
                ['7','QuxMoo'],['42','UniLif']
            ]);
            expect($scope.importNumberExample).toEqual('7');
            expect($scope.importNameExample).toEqual('QuxMoo');

            $scope.importLines = [];
            $scope.headerLength = 2;
            $scope.parseData();
            expect($scope.importLines).toEqual([
                ['42','UniLif']
            ]);
            expect($scope.importNumberExample).toEqual('42');
            expect($scope.importNameExample).toEqual('UniLif');

        });

        it('should not populate example lines if no data given',function() {
            $scope.importLines = [];
            $scope.importNumberExample = 'numberExample';
            $scope.importNameExample = 'nameExample';
            $scope.importRaw = '';
            $scope.parseData();
            expect($scope.importLines).toEqual([]);
            expect($scope.importNumberExample).toEqual('');
            expect($scope.importNameExample).toEqual('');
        });

        it('should correctly populate importLines when using a custom delimiter', function () {
            $scope.importLines = [];
            $scope.useCustomDelimiter = true;
            $scope.delimiter = ",";
            $scope.importRaw = "42,FooBar\n7,QuxMoo";
            $scope.parseData();
            expect($scope.importLines).toEqual([
                ['42','FooBar'],
                ['7','QuxMoo']
            ]);
            expect($scope.importNumberExample).toEqual('42');
            expect($scope.importNameExample).toEqual('FooBar');
        })
    });

    describe('save',function() {
        it('should hide the dialog',function() {
            $scope.dialog.show = true;
            $scope.importLines = [[42,'foo']];
            $scope.importNumberColumn = 1;
            $scope.importNameColumn = 2;
            $scope.save();
            expect($scope.dialog.show).toBe(false);
            expect(teamsMock.clear).toHaveBeenCalled();
            expect(teamsMock.add).toHaveBeenCalledWith({number:42,name:'foo'});
            expect(teamsMock.save).toHaveBeenCalled();
        });
    });

    describe('close',function() {
        it('should hide the dialog',function() {
            $scope.dialog.show = true;
            $scope.close();
            expect($scope.dialog.show).toBe(false);
            expect(teamsMock.save).not.toHaveBeenCalled();
        });
    });
});
