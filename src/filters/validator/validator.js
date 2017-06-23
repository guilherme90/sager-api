/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const validate = require('validate.js')

/**
 * @param {Object} data
 * @param {Object} constraints
 * 
 * @returns {Promise}
 */
module.exports = (data, constraints) => {
  return validate.async(
    data, 
    constraints, 
    { 
      fullMessages: false 
    }
  )
}