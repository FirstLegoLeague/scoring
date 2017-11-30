define([
    'directives/ng-directives',
    'directives/datatable',

    'services/ng-services',
    'services/log',
    'services/ng-session',

    'views/settings',
    'views/tournament',
    'views/scoresheet',
    'views/scores',

    'angular-bootstrap',
    'angular-touch',
    'angular-animate',
    'angular-sanitize',
    'angular-storage',
    'angular'

],function(directives, datatable, services, log, session, settings, tournament, scoresheet, scores) {

    log('device ready');

    //initialize main controller and load main view
    //load other main views to create dynamic views for different device layouts
    angular.module('main',['ngAnimate']).controller('mainCtrl',[
        '$scope', '$session', '$location',
        function($scope, $session, $location) {
            log('init main ctrl');

            const PAGES = [
                { name: 'scoresheet', title: 'Scoresheet', icon: 'check' },
                { name: 'scores', title: 'Scores', icon: 'list' },
                { name: 'tournament', title: 'Tournament', icon: 'people' },
                { name: 'settings', title: 'Settings', icon: 'settings' }
            ];

            const pageLoader = angular.element('.viewMain .dimmer');

            $scope.drawer = 'views/drawer.html';
            $scope.scoringPages = ['scoresheet','settings'];
            $scope.validationErrors = [];
            $scope.drawerVisible = false;

            $session.load().then(function(session) {
                if(session['passport']) {
                    $scope.user = session['passport'].user;
                    $scope.pages = PAGES.filter(page => $scope.user.pages.includes(page.name));
                } else {
                    $scope.pages = PAGES;
                }
                // Enrich pages
                $scope.pages.forEach(page => {
                    page.route = `views/pages/${page.name}.html`;
                    page.classes = `page view-${page.name}${($scope.pages.length === 1 ? ' only-page' : '')}`;
                });
                // Set current page
                let urlPath = $location.path();
                let pageFromURL = $scope.pages.find(page => `/${page.name}` === urlPath);

                $scope.setPage(pageFromURL || $scope.pages[0]);
            });

            $scope.toggleDrawer = function(set) {
                if (set !== undefined) {
                    $scope.drawerVisible = set;
                } else {
                    $scope.drawerVisible = !$scope.drawerVisible;
                }
            };

            $scope.setPage = function(page) {
                if($scope.currentPage) {
                    $scope.currentPage.scope = undefined;
                }
                $scope.currentPage = page;
                $location.path(page.name);
                pageLoader.removeClass('disabled');
                $scope.drawerVisible = false;
            };

            $scope.goTo = function(pageName, callback) {
                var page = $scope.pages.find(page => page.name === pageName);
                $scope.pageLoadCallback = callback;
            }

            $scope.pageLoaded = function() {
                if($scope.pageLoadCallback) {
                    $scope.pageLoadCallback($scope.currentPage.scope);
                    $scope.pageLoadCallback = undefined;
                }
                pageLoader.addClass('disabled');
            };

            $scope.initPage = function(pageName, pageScope) {
                log(`init ${pageName} page`);
                $scope.pages.find(page => page.name === pageName).scope = pageScope;
            }

        }
    ]);
    angular.module('main').config(function($compileProvider){
        // Override to allow data: URI's (e.g. for CSV export)
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
    });
    angular.bootstrap(document.body,[
        'main',
        'ui.bootstrap',
        'ngSanitize',
        'ngTouch',
        settings.name,
        tournament.name,
        scoresheet.name,
        scores.name,
        services.name,
        directives.name
    ]);
});
