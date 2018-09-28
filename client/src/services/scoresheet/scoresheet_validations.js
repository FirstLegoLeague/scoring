class ScoresheetValidations {
  constructor (Configuration) {
    Object.assign(this, { Configuration })
  }

  validate (scorehseet) {
    return this.Configuration.load()
      .then(config => {
        const errors = []

        // Mission errors
        scorehseet.missions.forEach(mission => {
          if (!mission.complete) {
            errors.push({ error: 'Some missions are incomplete', mission })
          } else if (mission.error) {
            errors.push({ error: mission.error, mission })
          }
        })

        if (config.requireRef && typeof scorehseet.referee === 'undefined') {
          errors.push({ error: 'Missing referee' })
        }

        if (config.requireTable && typeof scorehseet.tableId === 'undefined') {
          errors.push({ error: 'Missing table' })
        }

        if (config.requireSignature && typeof scorehseet.signature.isEmpty) {
          errors.push({ error: 'Missing signature' })
        }

        if (typeof scorehseet.teamNumber === 'undefined') {
          errors.push({ error: 'Missing team' })
        }

        if (typeof scorehseet.matchId === 'undefined') {
          errors.push({ error: 'Missing round' })
        }

        return errors
      })
  }
}

ScoresheetValidations.$$ngIsClass = true
ScoresheetValidations.$inject = ['Configuration']

export default ScoresheetValidations
