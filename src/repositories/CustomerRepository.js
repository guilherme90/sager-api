/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const {SORT_ASCENDING, SORT_DESCENDING} = require('../filters/constants')
const Customer = require('../schemas/Customer')
const isValidObjectId = require('../db/isValidObjectId')
const validator = require('../filters/validator/validator')
const costumerRules = require('../filters/validator/rules/customer')

const CustomerRepository = {
  /**
   * @param {String|undefined} query
   * 
   * @return {Promise}
   */
  findAllCustomers(query) {
    if (query) {
      return Customer
        .find({
          $or: [
            {
              name: {
                $regex: new RegExp(query.toUpperCase().trim()),
                $options: 'i'
              }
            },{
              email: {
                $regex: new RegExp(query.toLowerCase().trim()),
                $options: 'i'
              }
            }
          ]
        })
        .sort({
          name: SORT_ASCENDING,
          created_at: SORT_DESCENDING
        })
        .limit(10)
    }

    return Customer
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
      return Promise.reject(`Oops! O código "${customerId}" informado é inválido.`)
    }

    return Customer.findById({_id: id})
  },

  /**
   * @param {Object} data
   * 
   * @return {Promise}
   */
  add(data) {
    return validator(data, costumerRules)
      .then((success, error) => error)
      .then(() => {
        const CustomerSchema = new Customer(data)

        return CustomerSchema.save()
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
      return Promise.reject(`Oops! O código "${customerId}" informado é inválido.`)
    }

    return validator(data, costumerRules)
      .then((success, error) => error)
      .then(() => {
        return Customer.findOneAndUpdate({_id: id}, {$set: data}, {new: true})
      })
  },

  /**
   * @param {String} id
   * 
   * @return Promise
   */
  remove(id) {
    if (! isValidObjectId(id)) {
      return Promise.reject(`Oops! O código "${customerId}" informado é inválido.`)
    }

    return Customer.findByIdAndRemove(id)
  }
}

module.exports = CustomerRepository