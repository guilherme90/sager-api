/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

/**
 * @returns {Object}
 */
module.exports = {
  withPassword: {
    name: {
      presence: {
        message: 'O nome é obrigatório'
      }
    },
    email: {
      presence: {
        message: 'O email é obrigatório'
      },
      email: {
        message: 'O email informado é inválido'
      }
    },
    password: {
      presence: {
        message: 'A senha é obrigatória'
      },
      length: {
        minimum: 4,
        message: 'A senha deve possuir no mínimo 4 caracteres'
      }
    }
  },
  withoutPassword: {
    name: {
      presence: {
        message: 'O nome é obrigatório'
      }
    },
    email: {
      presence: {
        message: 'O email é obrigatório'
      },
      email: {
        message: 'O email informado é inválido'
      }
    }
  }
}