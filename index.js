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

const corsOptions = {
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}

app.use('/api', cors(corsOptions))

/**
 * routes api
 */
app.use('/api', require('./src/routes/UserRoutes')(router))
app.use('/api', require('./src/routes/CustomerRoutes')(router))
app.use('/api', require('./src/routes/CustomerAddressRoutes')(router))
app.use('/api', require('./src/routes/inspection/InspectionRoutes')(router))
app.use('/api', require('./src/routes/CityRoutes')(router))

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