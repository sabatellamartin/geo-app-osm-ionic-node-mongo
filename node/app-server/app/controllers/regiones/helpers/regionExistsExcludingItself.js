const Region = require('../../../models/region')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a region already exists excluding itself
 * @param {string} id - id of item
 * @param {string} nombre - name of item
 */
const regionExistsExcludingItself = (id = '', nombre = '') => {
  return new Promise((resolve, reject) => {
    Region.findOne(
      {
        nombre,
        _id: {
          $ne: id
        }
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

module.exports = { regionExistsExcludingItself }
