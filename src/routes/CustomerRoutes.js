/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const { findAllCustomers, findById, add, update, remove } = require('../repositories/CustomerRepository')

/**
 * @param {Router}
 * 
 * @return {core.Router}
 */
module.exports = (router) => {
  /**
   * GET /api/customers
   */
  router.get('/customers/:id?', (request, response) => {
    const id = request.params.id

    if (id) {
      return findById(id)
        .then(payload => response.status(200).send(payload))
        .catch(error => response.status(400).send(error.errors || error))
    }    

    findAllCustomers(request.query.search)
      .then(payload => response.status(200).send(payload))
      .catch(error => response.status(400).send(error.errors || error))
  })

  /**
   * POST /api/customers
   */
  router.post('/customers', (request, response) => {
    add(request.body)
      .then(payload => response.status(200).send(payload))
      .catch(error => response.status(400).send(error.errors || error))
  })

  /**
   * PUT /api/customers
   */
  router.put('/customers/:id', (request, response) => {
    const id = request.params.id

    update(id, request.body)
      .then(payload => response.status(200).send(payload))
      .catch(error => response.status(400).send(error.errors || error))
  })

  /**
   * DELETE /api/customers
   */
  router.delete('/customers/:id', (request, response) => {
    remove(request.params.id)
      .then(payload => response.status(200).send(payload))
      .catch(error => response.status(400).send(error.errors || error))
  })

  return router
}