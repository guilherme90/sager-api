/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const { SORT_ASCENDING, SORT_DESCENDING } = require('../../filters/constants')
const Inspection = require('../../schemas/Inspection')
const isValidObjectId = require('../../db/isValidObjectId')

const InspectionRepository = {
  /**
   * @param {String} addressId 
   * 
   * @return {Promise}
   */
  findAllByAddressId(addressId) {
    if (! isValidObjectId(addressId)) {
      Promise.reject(`Oops! Não encontramos nenhum endereço com o código ${addressId}`)
    }

    return Inspection
      .find({}, { 
        address: addressId
      })
  }
}

module.exports = InspectionRepository