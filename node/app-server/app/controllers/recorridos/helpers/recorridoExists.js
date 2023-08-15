const Recorrido = require('../../../models/recorrido')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a recorrido already exists in database
 * @param {string} timestamp - timestamp of item
 */
const recorridoExists = (timestamp = 0) => {
  return new Promise((resolve, reject) => {
    Recorrido.findOne(
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

module.exports = { recorridoExists }
