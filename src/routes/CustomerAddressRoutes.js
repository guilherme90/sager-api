/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const { findByAddressId, add, update, remove } = require('../repositories/CustomerAddressRepository')

/**
 * @param {Router}
 * 
 * @return {core.Router}
 */
module.exports = (router) => {
  /**
   * GET /api/customers/:customerId/addresses/:addressId
   */
  router.get('/customers/:customerId/addresses/:addressId', (request, response) => {
    const customerId = request.params.customerId
    const addressId = request.params.addressId

    findByAddressId(customerId, addressId)
      .then(payload => response.status(200).send(payload))
      .catch(error => response.status(400).send(error.errors || error))
  })

  /**
   * POST /api/customers/:customerId/addresses
   */
  router.post('/customers/:customerId/addresses', (request, response) => {
    const customerId = request.params.customerId

    add(customerId, request.body)
      .then(payload => response.status(200).send(payload))
      .catch(error => response.status(400).send(error.errors || error))
  })

  /**
   * PUT /api/customers/:customerId/addresses/:addressId
   */
  router.put('/customers/:customerId/addresses/:addressId', (request, response) => {
    const customerId = request.params.customerId
    const addressId = request.params.addressId

    update(customerId, addressId, request.body)
      .then(payload => response.status(200).send(payload))
      .catch(error => response.status(400).send(error.errors || error))
  })

  /**
   * DELETE api/customers/:customerId/addresses/:addressId
   */
  router.delete('/customers/:customerId/addresses/:addressId', (request, response) => {
    const customerId = request.params.customerId
    const addressId = request.params.addressId

    remove(customerId, addressId)
      .then(payload => response.status(200).send(payload))
      .catch(error => response.status(400).send(error.errors || error))
  })

  return router
}