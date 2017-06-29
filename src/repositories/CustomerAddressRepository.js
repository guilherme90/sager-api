/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const {SORT_ASCENDING, SORT_DESCENDING} = require('../filters/constants')
const Customer = require('../schemas/Customer')
const isValidObjectId = require('../db/isValidObjectId')
const validator = require('../filters/validator/validator')
const addressRules = require('../filters/validator/rules/customer-address')

const CustomerAddressRepository = {
  /**
   * @param {String} customerId
   * @param {String} addressId
   * 
   * @return {Promise}
   */
  findByAddressId(customerId, addressId) {
    if (! isValidObjectId(customerId)) {
      return Promise.reject(`Oops! O código "${customerId}" informado é inválido.`)
    }

    if (! isValidObjectId(addressId)) {
      return Promise.reject(`Oops! O código "${customerId}" informado é inválido.`)
    }

    return Customer.findOne({
      'addresses._id': addressId
    }, {
      'addresses.$': true
    })
  },

  /**
   * @param {String} customerId
   * @param {Object} data
   * 
   * @return {Promise}
   */
  add(customerId, data) {
    if (! isValidObjectId(customerId)) {
      return Promise.reject(`Oops! O código "${customerId}" informado é inválido.`)
    }

    return validator(data, addressRules)
      .then((success, error) => error)
      .then(() => {
        return Customer.findOneAndUpdate(
          {_id: customerId}, 
          {
            $push: { addresses: data }
          }, 
          {new: true})
      })
  },

  /**
   * @param {String} customerId
   * @param {String} addressId
   * @param {Object} data
   * 
   * @return {Promise}
   */
  update(customerId, addressId, data) {
    if (! isValidObjectId(customerId)) {
      return Promise.reject(`Oops! O código "${customerId}" informado é inválido.`)
    }

    if (! isValidObjectId(addressId)) {
      return Promise.reject(`Oops! O código "${customerId}" informado é inválido.`)
    }

    return validator(data, addressRules)
      .then((success, error) => error)
      .then(() => {
        return Customer.findOneAndUpdate(
          {
            _id: customerId,
            'addresses._id': addressId
          },{
            $set: {
              'addresses.$.address': data.address,
              'addresses.$.number': data.address,
              'addresses.$.neighborhood': data.neighborhood,
              'addresses.$.complement': data.complement,
              'addresses.$.state': data.state,
              'addresses.$.city': data.city,
            }
          },{
            new: true
          }
        )
      })
  },

  /**
   * @param {String} customerId
   * @param {String} addressId
   * 
   * @return Promise
   */
  remove(customerId, addressId) {
    if (! isValidObjectId(customerId)) {
      return Promise.reject(`Oops! O código "${customerId}" informado é inválido.`)
    }

    if (! isValidObjectId(addressId)) {
      return Promise.reject(`Oops! O código "${customerId}" informado é inválido.`)
    }

    return Customer.findOneAndUpdate({
      _id: customerId,
      'addresses._id': addressId
    }, {
      $pull: {
        addresses: {
          _id: addressId
        }
      }
    }, {
      multi: true,
      new: true
    })
  }
}

module.exports = CustomerAddressRepository
