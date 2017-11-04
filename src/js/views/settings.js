define('views/settings',[
    'services/log',
    'services/ng-stages',
    'services/ng-settings',
    'services/ng-challenge',
    'services/ng-handshake',
    'services/ng-message',
    'controllers/NewStageDialogController',
    'angular'
],function(log) {
    var moduleName = 'settings';
    return angular.module(moduleName,[
        'NewStageDialog'
    ]).controller(moduleName+'Ctrl',[
        '$scope', '$settings',
        function($scope, $settings) {
            log('init settings ctrl');
            $scope.log = log.get();

            $settings.init().then(function(res) {
                $scope.settings = res;

                $scope.advancedSettings = [
                    {
                        type: 'checkbox',
                        model: $scope.settings.autoBroadcast,
                        title: 'Automatic publishing',
                        description: 'When enabled, upon every change in the score, the display system will be updated.'
                    }, {
                        type: 'checkbox',
                        model: $scope.settings.autoPublish,
                        title: 'Automatic approval',
                        description: 'When enabled, scores submitted will be automatically approved.'
                    }, {
                        type: 'checkbox',
                        model: $scope.settings.ignoreNegativeScores,
                        title: 'Ignore negative scores',
                        description: 'When enabled, all negative scores will be displayed as 0 in the display system.'
                    }
                ];
            });

            $scope.save = function() {
                $settings.save();
            };

        }
    ]);
});
