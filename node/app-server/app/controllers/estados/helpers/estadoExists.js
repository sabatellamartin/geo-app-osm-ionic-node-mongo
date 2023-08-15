const Estado = require('../../../models/estado')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a estado already exists in database
 * @param {string} timestamp - timestamp of item
 */
const estadoExists = (timestamp = 0) => {
  return new Promise((resolve, reject) => {
    Estado.findOne(
      {
        timestamp
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }
        if (item) {
          return reject(buildErrObject(422, 'REPORTE_ALREADY_EXISTS'))
        }
        resolve(false)
      }
    )
  })
}

module.exports = { estadoExists }
