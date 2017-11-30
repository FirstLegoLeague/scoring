/**
 * This is a service that controls the dialogs in the page.
 */
define('services/dialogs',[
    'services/ng-services',
],function(module) {
    "use strict";

    return module.service('$dialogs',
    [function() {

        return {
            teamsImport: { show: false }
        };

    }]);
});
