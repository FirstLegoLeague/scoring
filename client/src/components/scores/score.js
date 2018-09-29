export default {
  template: `
<div class="card" ng-if="score.ready" ng-class="{ loading: score.loading }">
  <div class="dimmer">
    <div class="big loader"></div>
  </div>

  <score-metadata class="card-section" data="score.data"></score-metadata>

  <score-points class="stat text-center" data="score.data"></score-points>

  <score-ref-identity class="card-divider" data="score.data"></score-ref-identity>

  <score-actions class="card-section flex-child-shrink" data="score.data"></score-actions>

  <delete-score-modal data="score.data"></delete-score-modal>

</div>`,
  controller: 'ScoreController as score',
  bindings: { data: '=?' }
}
