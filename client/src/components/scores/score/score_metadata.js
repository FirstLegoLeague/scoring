export default {
  template: `
<div>
  <h4>
    <a editable-select="score.data.teamNumber" buttons="no" blur="submit" onaftersave="score.updateMatch()" e-ng-options="team.number as team.displayText for team in score.Tournament.teams">
      <div ng-class="{'card-section alert' : score.teamNumberError()}">{{ score.teamText() }}</div>
    </a>
  </h4>
  <h6 class="subheader">
    <a editable-select="score.data.matchId" buttons="no" blur="submit" onaftersave="score.setMatch()" e-ng-options="match._id as match.displayText for match in score.matches">
      <div ng-class="{'card-section alert' : score.matchError()}">{{ score.matchText() }}</div>
    </a>
  </h6>
</div>`,
  controller: 'ScoreController as score',
  bindings: { data: '=?' }
}
