const Region = require('../../../models/region')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a region already exists in database
 * @param {string} nombre - name of item
 */
const regionExists = (nombre = '') => {
  return new Promise((resolve, reject) => {
    Region.findOne(
      {
        nombre
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }

        if (item) {
          return reject(buildErrObject(422, 'REGION_ALREADY_EXISTS'))
        }
        resolve(false)
      }
    )
  })
}

module.exports = { regionExists }
