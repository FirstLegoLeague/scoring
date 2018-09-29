export default {
  template: `
  <div>
    <div class="alert button" ng-if="scores.user === 'admin'" ng-click="scores.openDeletionDialog()">
      <i class="fa" ng-class="scores.deleting ? 'fa-circle-notch fa-spin' : 'fa-trash-alt'"></i>
      Delete all scores
    </div>
  </div>
  
  <div>
    <a class="button" href="{{scores.rankingsLink}}"><i class="fa fa-download"></i> Download rankings</a>
  </div>`,
  controller: 'ScoresController as scores'
}
