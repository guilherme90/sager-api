/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const { addAddress, changeAddress } = require('../repositories/CustomerAddressRepository')

/**
 * @param {Router}
 * 
 * @return {core.Router}
 */
module.exports = (router) => {
  /**
   * POST /api/customers/:customerId/addresses
   */
  router.post('/customers/:customerId/addresses', (request, response) => {
    const customerId = request.params.customerId

    addAddress(customerId, request.body)
      .then(payload => response.status(200).send(payload))
      .catch(error => response.status(400).send(error.errors || error))
  })

  /**
   * PUT /api/customers/:customerId/addresses/:addressId
   */
  router.put('/customers/:customerId/addresses/:addressId', (request, response) => {
    const customerId = request.params.customerId
    const addressId = request.params.addressId

    changeAddress(customerId, addressId, request.body)
      .then(payload => response.status(200).send(payload))
      .catch(error => response.status(400).send(error.errors || error))
  })

  return router
}