define('views/settings',[
    'services/log',
    'services/ng-settings',
    'services/ng-message',
    'angular'
],function(log) {
    var moduleName = 'settings';
    return angular.module(moduleName,[]).controller(moduleName+'Ctrl',[
        '$scope', '$settings',
        function($scope, $settings) {
            log('init settings ctrl');
            $scope.log = log.get();

            $settings.init().then(function(res) {
                $scope.settings = res;
            });

            $scope.save = function() {
                $settings.save();
            };

        }
    ]);
});
