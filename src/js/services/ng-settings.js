/**
 * Settings storage.
 */
define('services/ng-settings',[
    'services/ng-services',
    'services/log'
],function(module,log) {
    "use strict";

    return module.service('$settings', ["$http", "$message", function($http, $message) {
        function Settings() {
            let self = this;
            /**
             * Array of all settings.
             * The reference will remain valid, so
             * adding/removing settings will automatically be
             * reflected in this instance.
             */
            this.settings = {};
            this.init();

            $message.on('settings:reload',function(data, msg) {
                if(!msg.fromMe)
                    self.load();
            });
        }


        /**
         * Initialize service, if not initialized already.
         * @returns Promise<void> that is resolved when init is complete.
         */
        Settings.prototype.init = function() {
            if (!this._initialized) {
                this._initialized = this.load();
            }
            return this._initialized;
        };

        Settings.prototype.load = function() {
            var self = this;
            // this.clear();
            return $http.get('/settings').then(function(res) {
                // Keep the same Object for external references
                Object.assign(self.settings, res.data);
                return self.settings;
            }).catch(function(err) {
                var defaults = {
                    tables: [{name: 'Table 1'},{name: 'Table 2'},{name: 'Table 3'},{name: 'Table 4'},{name: 'Table 5'},{name: 'Table 6'},{name: 'Table 7'},{name: 'Table 8'}],
                    referees: [{name: 'Ref 1'},{name: 'Ref 2'},{name: 'Ref 3'},{name: 'Ref 4'},{name: 'Ref 5'},{name: 'Ref 6'},{name: 'Ref 7'},{name: 'Ref 8'},{name: 'Head Ref 1'},{name: 'Head Ref 2'},{name: 'Head Ref 3'}],
                    customMhub: false,
                    mhub: `ws://${window.location.hostname}:13900`,
                    node: 'default',
                    challenge: '2017_en_US-official',
                    host: window.location.origin + '/',
                    autoPublish: true,
                    autoBroadcast: true,
                    currentStage: 'practice',
                    ignoreNegativeScores: true,
                    lineStartString: '',
                    separatorString: ',',
                    lineEndString: '',
                    autoScrolling: true,
                    fastScrolling: false,
                    showZeroScore: false,
                    requireSignature: true
                };
                //create settings file if not there
                log('settings read error, trying to create file', err);
                self.settings = defaults;
                var data = { settings: defaults };
                return $http.post("/settings/save", data).then(function (data, status) {
                    log(`Settings saved to settings.json: ${JSON.stringify(data)}`);
                    return self.settings;
                },function (err) {
                    log('Failed writing settings', err);
                });
            }).catch(function(err) {
                //return ephemeral settings
                log('unable to create settings file, giving up', err);
                return self.settings;
            });
        };

        Settings.prototype.save = function() {
            return $http.post('/settings/save',{settings: this.settings}).then(() => {
                $message.send('settings:reload');
            });
        };

        return new Settings();
    }]);
});
