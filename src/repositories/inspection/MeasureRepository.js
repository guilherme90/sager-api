/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const { SORT_ASCENDING, SORT_DESCENDING } = require('../../filters/constants')
const Inspection = require('../../schemas/Inspection')
const isValidObjectId = require('../../db/isValidObjectId')
const measureRules = require('../../filters/validator/rules/inspection/measure')

const MeasureRepository = {
  /**
   * @param {String} addressId 
   * @param {Object} data 
   * 
   * @return {Promise}
   */
  add(addressId, data) {
    if (! isValidObjectId(addressId)) {
      Promise.reject(`Oops! Não encontramos nenhum endereço com o código ${addressId}`)
    }

    const rules = measureRules.withoutAdditionals

    if ('beamQuantityAdditional' in data) {
      rules.beamQuantityAdditional = measureRules.beamQuantityAdditional
    }

    if ('fillQuantityAdditional' in data) {
      rules.fillQuantityAdditional = measureRules.fillQuantityAdditional
    }

    return validator(data, rules)
      .then((success, error) => error)
      .then(() => {
        const InspectionSchema = new Inspection(data)

        return InspectionSchema.save()
      })
  }
}

module.exports = MeasureRepository