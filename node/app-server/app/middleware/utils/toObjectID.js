const mongoose = require('mongoose')
const { buildErrObject } = require('./buildErrObject')

/**
 * Transforma un ID de tipo string a Object ID de MongoDB
 * @param {string} id - id to check
 */
const toObjectID = async (id = '') => {
  return new Promise((resolve, reject) => {
    const objectID = mongoose.Types.ObjectId(id)
    return objectID ? resolve(objectID) : reject(buildErrObject(422, 'ID_INVALID_TRANSFORM'))
  })
}

module.exports = { toObjectID }
