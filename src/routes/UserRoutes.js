/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const router = require('express').Router()
const { findAllUsers, add, update } = require('../repositories/UserRepository')
const isValidObjectId = require('../db/isValidObjectId')

/**
 * GET /api/users
 */
router.get('/users', (request, response) => {
  findAllUsers()
    .then(payload => {
      response.status(200).send({
        success: true,
        data: payload
      })
    })
    .catch(error => response.status(400).send(error.errors))
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
 * POST /api/users
 */
router.put('/users/:id', (request, response) => {
  let id = request.params.id

  update(id, request.body)
    .then(payload => {
      response.status(200).send({
        success: true,
        data: payload
      })
    })
    .catch(error => response.status(400).send({success: false, message: error.errors || error}))
})

module.exports = router;