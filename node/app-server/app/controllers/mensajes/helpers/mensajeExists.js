const Mensaje = require('../../../models/mensaje')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a mensaje already exists in database
 * @param {string} timestamp - timestamp of item
 */
const mensajeExists = (timestamp = 0) => {
  return new Promise((resolve, reject) => {
    Mensaje.findOne(
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

module.exports = { mensajeExists }
