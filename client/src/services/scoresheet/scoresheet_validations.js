class ScoresheetValidations {
  constructor (configuration, user) {
    Object.assign(this, { configuration, user })
  }

  validate (scorehseet) {
    return this.configuration.load()
      .then(config => {
        const isRef = this.user.isRef()
        const errors = []

        // Mission errors
        scorehseet.missions.forEach(mission => {
          if (!mission.complete) {
            errors.push({ error: 'Some missions are incomplete', mission })
          } else if (mission.error) {
            errors.push({ error: mission.error, mission })
          }
        })

        if (isRef && config.requireRef && typeof scorehseet.referee === 'undefined') {
          errors.push({ error: 'Missing referee' })
        }

        if (isRef && config.requireTable && typeof scorehseet.tableId === 'undefined') {
          errors.push({ error: 'Missing table' })
        }

        if (typeof scorehseet.teamNumber === 'undefined' || scorehseet.teamNumber === null) {
          errors.push({ error: 'Missing team' })
        }

        if (typeof scorehseet.matchId === 'undefined' || scorehseet.matchId === null) {
          errors.push({ error: 'Missing round' })
        }

        if (config.requireSignature && (!scorehseet.signature || scorehseet.signature.isEmpty)) {
          errors.push({ error: 'Missing signature' })
        }

        console.log(errors)
        return errors
      })
  }
}

ScoresheetValidations.$$ngIsClass = true
ScoresheetValidations.$inject = ['Configuration', 'User']

export default ScoresheetValidations
