/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const { findAllStates, findCitiesFromUf } = require('../repositories/CityRepository')

/**
 * @param {Router}
 * 
 * @return {core.Router}
 */
module.exports = (router) => {
  /**
   * GET /api/states
   */
  router.get('/states', (request, response) => {
    findAllStates(request.query.search)
      .then(payload => response.status(200).send(payload))
      .catch(error => response.status(404).send(error))
  })

  /**
   * GET /api/states/:uf/cities
   */
  router.get('/states/:uf/cities', (request, response) => {
    const uf = request.params.uf
    const query = request.query.search

    findCitiesFromUf(uf, query)
      .then(payload => {
        if (payload.length === 0) {
          response.status(200).send(`Oopz! Nenhuma cidade encontrada do estado "${uf}"`)
        }

        response.status(200).send(payload)
      })
      .catch(error => response.status(404).send(error))
  })

  return router
}