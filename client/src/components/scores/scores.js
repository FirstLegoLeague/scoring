'use strict'

export default {
	template: `
<div class="top-bar secondary" ng-if="scores.any()">
    <div class="top-bar-left">
        <ul class="menu">
            <div>
                <input name="search" type="text" ng-model="scores.search" placeholder="Search Scores" />
            </div>
            <div>
                <button class="button" ng-class="{ disabled: scores.duplicateScores().length === 0 }" ng-click="scores.showDuplicates = !scores.showDuplicates">
                    {{ scores.showDuplicates ? 'Show all scores' : 'Show only duplicates' }}
                </button>
            </div>
            <div>
                <button class="button"  ng-class="{ disabled: scores.errorScores().length === 0 }" ng-click="scores.showErrors = !scores.showErrors">
                    {{ scores.showErrors ? 'Show all scores' : 'Show only bad scores'}}
                </button>
            </div>
        </ul>
    </div>
    <div class="top-bar-right">
        <ul class="menu">
            <div>
                <div class="alert button" ng-if="scores.user === 'admin'" ng-click="scores.openDeletionDialog()">
                    <i class="fa" ng-class="scores.deleting ? 'fa-circle-notch fa-spin' : 'fa-trash-alt'"></i>
                    Delete all scores
                </div>
            </div>
            <div>
                <a class="button" href="{{scores.rankingsLink}}"><i class="fa fa-download"></i> Download rankings</a>
            </div>
        </ul>
    </div>
</div>
<div class="top-bar-page" ng-class="{ loading: scores.loading }">
    <div class="dimmer">
        <div class="large loader"></div>
    </div>
    <div id="scores-list" class="grid-x grid-padding-x small-up-1 medium-up-3 large-up-5">
        <div ng-repeat="score in scores.scores()" class="cell grid-x">
            <score id="score-{{score._id}}" data="score" class="cell grid-y"></score>
        </div>
    </div>
    <div id="empty-scores-list" ng-if="!scores.any()" class="grid-container">
        <div class="secondary callout">
            <h2>No scores. Please enter some using the scoresheet in order to see them here.</h2>
        </div>
    </div>
</div>
<div id="scores-deletion-modal" class="fast reveal" data-reveal data-animation-in="hinge-in-from-middle-y" data-animation-out="hinge-out-from-middle-y">
    <h4>Do you really want to delete <b>all</b> scores?</h4>
    <div class="subheader">This operation is ireversable and dangerous!</div>
    <div class="grid-x align-center button-group">
        <div class="button" ng-click="scores.closeDeletionDialog()">No, I think I'll pass...</div>
        <div class="alert button" ng-click="scores.deleteAll()">Yes, just do it!</div>
    </div>
    <button class="close-button" data-close aria-label="Close modal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>`,
	controller: 'ScoresController as scores'
}