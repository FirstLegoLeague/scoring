class ScoresheetValidations {
  constructor (configuration) {
    Object.assign(this, { configuration })
  }

  validate (scorehseet) {
    return this.configuration.load()
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

        if (typeof scorehseet.teamNumber === 'undefined' || scorehseet.teamNumber === null) {
          errors.push({ error: 'Missing team' })
        }

        if (config.requireSignature && (!scorehseet.signature || scorehseet.signature.isEmpty)) {
          errors.push({ error: 'Missing signature' })
        }

        return errors
      })
  }
}

ScoresheetValidations.$$ngIsClass = true
ScoresheetValidations.$inject = ['configuration']

export default ScoresheetValidations
