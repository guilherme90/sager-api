/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const PORT = process.env.npm_package_config_port;
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const express = require('express')
const app = express()
const router = require('express').Router()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(compression())
app.use(helmet())

app.disable('x-powered-by')
app.options('*', cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

/**
 * routes api
 */
app.use('/api', require('./src/routes/UserRoutes')(router))

app.get('*', (request, response) => {
  response.status(200).send({
      success: true,
      message: 'API initialized!'
    })
})

const server = app.listen(PORT, () => {
  const address = server.address()

  console.log("Server started on http://%s:%s", address.address, address.port)
})