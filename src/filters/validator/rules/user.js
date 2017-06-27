/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const { MESSAGE_REQUIRE_FIELD } = require('../../constants')

/**
 * @returns {Object}
 */
module.exports = {
  withPassword: {
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
    userType: {
      presence: {
        message: MESSAGE_REQUIRE_FIELD
      }
    },
    password: {
      presence: {
        message: MESSAGE_REQUIRE_FIELD
      },
      length: {
        minimum: 6,
        message: 'Deve ter no mínimo 6 caracteres'
      }
    }
  },
  withoutPassword: {
    name: {
      presence: {
        message: MESSAGE_REQUIRE_FIELD
      }
    },
    userType: {
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
    }
  }
}