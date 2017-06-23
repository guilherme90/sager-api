/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const mongoose = require('./mongodb')

/**
 * @param {String} id
 * 
 * @returns {Boolean}
 */
module.exports = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
}