/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const { MESSAGE_REQUIRE_FIELD } = require('../../constants')

const presence = {
  presence: {
    message: MESSAGE_REQUIRE_FIELD
  }
}

/**
 * @return {Object}
 */
module.exports = {
  address: presence,
  neighborhood: presence,
  number: presence,
  complement: presence,
  state: presence,
  city: presence
}