/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const { MESSAGE_REQUIRE_FIELD } = require('../../constants')

/**
 * @return {Object}
 */
module.exports = {
  name: {
    presence: {
      message: MESSAGE_REQUIRE_FIELD
    }
  },
  email: {
    presence: {
      message: MESSAGE_REQUIRE_FIELD
    },
    email: {
      message: 'Email informado é inválido'
    }
  },
  cellphone: {
    presence: {
      message: MESSAGE_REQUIRE_FIELD
    }
  }
}