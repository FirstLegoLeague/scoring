class ScoresheetValidations {
  validate (scorehseet) {
    const errors = []

    // Mission errors
    scorehseet.missions.forEach(mission => {
      if (!mission.complete) {
        errors.push({ error: 'Some missions are incomplete', mission })
      } else if (mission.error) {
        errors.push({ error: mission.error, mission })
      }
    })

    if (typeof scorehseet.referee === 'undefined') {
      errors.push({ error: 'Missing referee' })
    }

    if (typeof scorehseet.tableId === 'undefined') {
      errors.push({ error: 'Missing table' })
    }

    if (typeof scorehseet.teamNumber === 'undefined') {
      errors.push({ error: 'Missing team' })
    }

    if (typeof scorehseet.matchId === 'undefined') {
      errors.push({ error: 'Missing round' })
    }

    return errors
  }
}

ScoresheetValidations.$$ngIsClass = true

export default ScoresheetValidations
