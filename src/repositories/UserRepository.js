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
   * @return {Promise}
   */
  findAllUsers(query) {
    if (query) {
      return User
        .find({
          name: {
            $regex: new RegExp(query.toUpperCase().trim()),
            $options: 'i'
          }
        }, {
          _id: true,
          name: true,
          email: true,
          active: true
        })
        .sort({
          name: SORT_ASCENDING
        })
    }

    return User
      .find()
      .sort({
        name: SORT_ASCENDING
      })
  },

  /**
   * @param {String} id
   * 
   * @return {Promise}
   */
  findById(id) {
    if (! isValidObjectId(id)) {
      return Promise.reject(`Oops! Não encontramos nenhum usuário com o código "${id}"`)
    }

    return User.findById({_id: id})
  },

  /**
   * @param {Object} data
   * 
   * @return {Promise}
   */
  add(data) {
    return validator(data, userRules.withPassword)
      .then((success, error) => error)
      .then(() => {
        const UserSchema = new User(data)

        return UserSchema.save()
      })
  },

  /**
   * @param {String} id 
   * @param {Object} data 
   * 
   * @return {Promise}
   */
  update(id, data) {
    if (! isValidObjectId(id)) {
      return Promise.reject(`Oops! Não encontramos nenhum usuário com o código "${id}"`)
    }

    const rules = userRules.withoutPassword

    if (isEmpty(data.password)) {
      rules = userRules.withPassword
    }

    return validator(data, rules)
      .then((success, error) => error)
      .then(() => {
        if (data.password.length === 0) {
          delete data.password
        }

        return User.findOneAndUpdate({_id: id}, {$set: data}, {new: true})
      })
  },

  /**
   * @param {String} id
   * 
   * @return Promise
   */
  remove(id) {
    if (! isValidObjectId(id)) {
      return Promise.reject(`Oops! Não encontramos nenhum usuário com o código "${id}"`)
    }

    return User.findByIdAndRemove(id)
  }
}

module.exports = UserRepository