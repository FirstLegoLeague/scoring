const { authroizationMiddlware } = require('@first-lego-league/ms-auth')
const { MongoCollectionServer } = require('@first-lego-league/synced-resources')

const { Score } = require('../resources/score')

const allowOnlyAdminOrScorekeeper = authroizationMiddlware(['admin', 'scorekeeper', 'development'])
const allowOnlyAdmin = authroizationMiddlware(['admin', 'development'])
const scoresRouter = new MongoCollectionServer(Score, {
  before: {
    update: allowOnlyAdminOrScorekeeper,
    delete: allowOnlyAdminOrScorekeeper,
    deleteAll: allowOnlyAdmin
  }
})

exports.scoresRouter = scoresRouter
