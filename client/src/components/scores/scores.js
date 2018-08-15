'use strict'

export default {
	template: `
<div class="top-bar secondary">
    <div class="top-bar-left">
        <ul class="menu">
            <div>
                <input name="search" type="text" ng-model="scores.search" placeholder="search Scores" />
            </div>
            <div>
                <button class="button" ng-hide="scores.duplicateScores().length === 0" ng-click="scores.showDuplicates = !scores.showDuplicates">
                    {{ scores.showDuplicates ? 'Show all scores' : 'Show only duplicates' }}
                </button>
            </div>
            <div>
                <button class="button" ng-hide="scores.errorScores().length === 0" ng-click="scores.showErrors = !scores.showErrors">
                    {{ scores.showErrors ? 'Show all scores' : 'Show only bad scores'}}
                </button>
            </div>
        </ul>
    </div>
    <div class="top-bar-right">
        <ul class="menu">
            <li>
                <a class="button" href="{{scores.rankingsLink}}"><i class="fa fa-download"></i> Download rankings</a>
            </li>
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
</div>`,
	controller: 'ScoresController as scores'
}