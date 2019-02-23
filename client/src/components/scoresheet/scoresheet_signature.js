export default {
  template: `
  <div id="signature" class="callout" ng-class="scoresheetSignature.error() ? 'alert' : 'success'">
    <signature-pad accept="getSignature" clear="clearSignature" height="128" width="300" ng-show="scoresheetSignature.data.allowSignatureEditing"></signature-pad>
    <img ng-src="{{scoresheetSignature.signature().dataUrl}}" ng-hide="scoresheetSignature.data.allowSignatureEditing" />
    <div class="clear button" data-tooltip title="Reset signature" ng-show="scoresheetSignature.data.allowSignatureEditing" ng-disabled="scoresheetSignature.signature().isEmpty" ng-click="scoresheetSignature.$scope.clearSignature()">
      <i class="fa fa-undo"></i>
    </div>
    <div class="stamp hollow alert button" ng-click="scoresheetSignature.scrollToMission(scoresheetSignature.error().mission)">{{scoresheetSignature.error().error}}</div>
  </div>`,
  controller: 'ScoresheetSignatureController as scoresheetSignature'
}
