const Reporte = require('../../../models/reporte')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a reporte already exists in database
 * @param {string} timestamp - timestamp of item
 */
const reporteExists = (timestamp = 0) => {
  return new Promise((resolve, reject) => {
    Reporte.findOne(
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

module.exports = { reporteExists }
