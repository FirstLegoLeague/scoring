import CollectionClient from '@first-lego-league/synced_resorces'
import Score from '../../../resources/score'

class Scores extends CollectionClient {
  constructor () {
    super(Score, '/scores')
    this.Score = Score
  }
}

Scores.$$ngIsClass = true
Scores.$inject = []

export default Scores
