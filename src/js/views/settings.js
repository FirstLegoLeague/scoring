define('views/settings',[
    'services/log',
    'services/ng-settings',
    'services/ng-message',
    'angular'
],function(log) {
    var moduleName = 'settings';
    return angular.module(moduleName,[]).controller(moduleName+'Ctrl',[
        '$scope', '$settings','$timeout',
        function($scope, $settings, $timeout) {
            $scope.initPage(moduleName, $scope);

            $scope.log = log.get();

            $settings.init().then(function(res) {
                $scope.settings = res;
            });

            $scope.save = function() {
                $settings.save().then(res => {
                    angular.element('.settings-message.success').addClass('animating');
                    $timeout(() => {
                      angular.element('.settings-message').removeClass('animating');
                    }, 3000);
                }).catch(err => {
                    angular.element('.settings-message.fail').addClass('animating');
                    $timeout(() => {
                      angular.element('.settings-message').removeClass('animating');
                    }, 3000);
                });
            };

        }
    ]);
});
