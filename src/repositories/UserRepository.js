/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const {SORT_ASCENDING, SORT_DESCENDING} = require('../filters/constants')
const User = require('../schemas/User')
const isValidObjectId = require('../db/isValidObjectId')
const bcrypt = require('bcrypt')
const validator = require('../filters/validator/validator')
const isEmpty = require('validator/lib/isEmail');
const userRules = require('../filters/validator/rules/user')

const UserRepository = {
  /**
   * @returns {Promise}
   */
  findAllUsers() {
    return User
      .find()
      .sort({
        name: SORT_ASCENDING
      })
  },

  /**
   * @param {Object} data
   * 
   * @returns {Promise}
   */
  add(data) {
    return validator(data, userRules.withoutPassword)
      .then((success, error) => error)
      .then(() => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(data.password, salt);
        data.password = hash
        
        const UserSchema = new User(data)

        return UserSchema.save()
      })
  },

  /**
   * @param {String} id 
   * @param {Object} data 
   * 
   * @returns {Promise}
   */
  update(id, data) {
    if (! isValidObjectId(id)) {
      return Promise.reject(`Oops! Não encontramos nenhum usuário com o código "${id}"`)
    }

    let constraints = userRules.withoutPassword

    if (isEmpty(data.password)) {
      constraints = userRules.withPassword
    }

    return validator(data, constraints)
      .then((success, error) => error)
      .then(() => {
        if (! isEmpty(data.password)) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(data.password, salt);
          data.password = hash
        }

        return User.findOneAndUpdate({_id: id}, {$set: data}, {new: true})
      })
  }
}

module.exports = UserRepository