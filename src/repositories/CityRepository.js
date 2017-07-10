/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const { SORT_ASCENDING, SORT_DESCENDING } = require('../filters/constants')
const City = require('../schemas/City')
const State = require('../schemas/State')

const CityRepository = {
  /**
   * @return {Promise}
   */
  findAllStates() {
    return State
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
   * @param {String} query
   * 
   * @return {Promise}
   */
  findCitiesFromUf(uf, query) {
    if (query.length >= 2) {
      return City
        .find({
          uf: {
            cod_uf: uf
          },
          nome: {
            $regex: new RegExp(query.toUpperCase().trim()),
            $options: 'i'
          }
        }, {
          nome: true
        })
        .sort({
          nome: SORT_ASCENDING
        })
    }

    return Promise.reject('Oops! É necessário informar no mínimo 2 letras para buscar as cidades.')
  }
}

module.exports = CityRepository