const { Model, InvalidEntry } = require('@first-lego-league/synced-resources')
const Configuration = require('@first-lego-league/ms-configuration')

class Score extends Model {
  sanitize () {
    return Configuration.all().then(config => {
      return Object.entries(this).reduce((score, [key, value]) => {
        const field = Score.FIELDS[key]
        if (field && field.type) {
          if (field.type === 'as-is') {
            score[key] = value
          } else {
            score[key] = field.type(value)
          }
        }
        return score
      }, { public: config.autoPublish, noShow: false, lastUpdate: new Date() })
    })
  }

  validate () {
    return Score.requiredFields().then(requiredFields => {
      requiredFields.forEach(requiredField => {
        if (!this.hasOwnProperty(requiredField)) {
          throw new InvalidEntry(`Missing field: ${requiredField}`)
        }
      })
    })
  }

  enrich () {
    
  }
}

Score.requiredFields = () => {
  return Configuration.all().then(config => {
    return Object.entries(Score.FIELDS)
      .filter(([key, fieldData]) => {
        if (fieldData.required instanceof Function) {
          return fieldData.required(this, config)
        } else {
          return Boolean(fieldData.required)
        }
      })
      .map(([key]) => key)
  })
}

Score.FIELDS = {
  missions: { type: 'as-is', required: true },
  score: { type: Number, required: true },
  challenge: { type: String, required: true },
  teamNumber: { type: Number, required: true },
  round: { type: Number, required: true },
  stage: { type: Number, required: true },
  matchId: { type: Number, required: false },
  referee: { type: String, required: false },
  tableId: { type: Number, required: false },
  public: { type: Boolean, required: false },
  noShow: { type: Boolean, required: false },
  creation: { type: Date, required: false },
  lastUpdate: { type: Date, required: false },
  signature: { type: 'as-is', required: (score, config) => config.requireSignature }
}

exports.Score = Score
