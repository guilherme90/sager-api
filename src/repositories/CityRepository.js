/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const {SORT_ASCENDING, SORT_DESCENDING} = require('../filters/constants')
const City = require('../schemas/City')

const CityRepository = {
  /**
   * @return {Promise}
   */
  findAllStates() {
    return City
      .find({}, { 
        uf: true,
        sigla_uf: true,
        nome_uf: true
      })
      .sort({
        nome_uf: SORT_ASCENDING
      })
  },

  /**
   * @param {Number} uf 
   * 
   * @return {Promise}
   */
  findCitiesFromUf(uf) {
    return City
      .find({
        uf: uf
      }, {
        cidades: true
      })
      .sort({
        nome_uf: SORT_ASCENDING
      })
  }
}

module.exports = CityRepository