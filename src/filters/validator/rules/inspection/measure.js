/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const { MESSAGE_REQUIRE_FIELD } = require('../../../constants')

const presence = {
  presence: {
    message: MESSAGE_REQUIRE_FIELD
  }
}

const defaultFieldsToValidate = {
  typeMeasure: presence,
  name: presence,
  beam: {
    presence: presence,
    numericality: {
      greaterThan: 0
    }
  },
  distanceBetweenBeams: {
    presence: presence,
    numericality: {
      greaterThan: 0
    }
  },
  squareMeter: {
    presence: presence,
    numericality: {
      greaterThan: 0
    }
  }
}

/**
 * @return {Object}
 */
module.exports = {
  beamQuantityAdditional: {
    numericality: {
      greaterThan: 0
    }
  },
  fillQuantityAdditional: {
    numericality: {
      greaterThan: 0
    }
  },
  withoutAdditionals: defaultFieldsToValidate
}