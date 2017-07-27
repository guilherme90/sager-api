/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const { findAllByAddressId } = require('../../repositories/inspection/InspectionRepository')

/**
 * @param {Router}
 * 
 * @return {core.Router}
 */
module.exports = (router) => {
  /**
   * GET /api/inspections/:addressId
   */
  router.get('/inspections/:addressId', (request, response) => {
    const addressId = request.params.addressId

    findAllByAddressId(addressId)
      .then(payload => response.status(200).send(payload))
      .catch(error => response.status(400).send(error.errors || error))
  })

  return router
}