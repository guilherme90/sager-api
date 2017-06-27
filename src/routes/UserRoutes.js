/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const { findAllUsers, findById, add, update, remove } = require('../repositories/UserRepository')
const isValidObjectId = require('../db/isValidObjectId')

/**
 * @param {Router}
 * 
 * @return {core.Router}
 */
module.exports = (router) => {
  /**
   * GET /api/users
   */
  router.get('/users/:id?', (request, response) => {
    const id = request.params.id

    if (id) {
      return findById(id)
        .then(payload => {
          response.status(200).send(payload)
        })
        .catch(error => response.status(400).send(error.errors || error))
    }    

    findAllUsers(request.query.search)
      .then(payload => {
        response.status(200).send(payload)
      })
      .catch(error => response.status(400).send(error.errors || error))
  })

  /**
   * POST /api/users
   */
  router.post('/users', (request, response) => {
    add(request.body)
      .then(payload => {
        response.status(200).send({
          success: true,
          data: payload
        })
      })
      .catch(error => response.status(400).send(error.errors || error))
  })

  /**
   * PUT /api/users
   */
  router.put('/users/:id', (request, response) => {
    const id = request.params.id

    update(id, request.body)
      .then(payload => {
        response.status(200).send({
          success: true,
          data: payload
        })
      })
      .catch(error => response.status(400).send({success: false, message: error}))
  })

  /**
   * DELETE /api/users
   */
  router.delete('/users/:id', (request, response) => {
    remove(request.params.id)
      .then(payload => {
        response.status(200).send({
          success: true,
          data: payload
        })
      })
      .catch(error => response.status(400).send({success: false, message: error}))
  })

  return router
}