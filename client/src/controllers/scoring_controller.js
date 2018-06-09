'use strict'

class ScoringController {

  constructor ($scope, Notifications, Independence) {
  	this.$scope = $scope
  	this.Notifications = Notifications
    this.Independence = Independence
  }

  $onInit () {
  	let self = this
  	this.$scope.$on('notify', (event, options) => {
  		self.Notifications.notify(options.level, options.message)
  	})

    this.$scope.$on('open scoresheet', (event, score) => {
      self.$scope.$broadcast('load', score)
      self.toggleScoresList()
    })

    this.$scope.$on('close scoresheet', (event, score) => {
      self.$scope.$broadcast('reload')
      self.toggleScoresList()
    })
  }

  toggleScoresList () {
    this.showScoresScreen = !this.showScoresScreen
  }

  statusClass () {
    switch(this.Independence.status()) {
      case this.Independence.STATUS_CODES.ONLINE: return 'online';
      case this.Independence.STATUS_CODES.TEMPORARY_OFFLINE: return 'temporary-offline';
      case this.Independence.STATUS_CODES.PERMENENTLY_OFFLINE: return 'permanently-offline';
    }
  }

  statusText () {
    switch(this.Independence.status()) {
      case this.Independence.STATUS_CODES.ONLINE: return 'Online';
      case this.Independence.STATUS_CODES.TEMPORARY_OFFLINE: return 'Temporary Offline';
      case this.Independence.STATUS_CODES.PERMENENTLY_OFFLINE: return 'Permenently Offline';
    }
  }

}

ScoringController.$inject = ['$scope', 'Notifications', 'Independence']

export default ScoringController
