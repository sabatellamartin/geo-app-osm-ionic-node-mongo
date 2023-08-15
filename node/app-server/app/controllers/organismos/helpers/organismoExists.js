const Organismo = require('../../../models/organismo')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists in database
 * @param {string} nombre - name of item
 */
const organismoExists = (nombre = '') => {
  return new Promise((resolve, reject) => {
    Organismo.findOne(
      {
        nombre
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }

        if (item) {
          return reject(buildErrObject(422, 'INSTITUCION_ALREADY_EXISTS'))
        }
        resolve(false)
      }
    )
  })
}

module.exports = { organismoExists }
