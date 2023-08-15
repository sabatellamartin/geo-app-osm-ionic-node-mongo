const Operacion = require('../../../models/operacion')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a operacion already exists in database
 * @param {string} nombre - name of item
 */
const operacionExists = (timestamp = 0) => {
  return new Promise((resolve, reject) => {
    Operacion.findOne(
      {
        timestamp
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }
        if (item) {
          return reject(buildErrObject(422, 'OPERACION_ALREADY_EXISTS'))
        }
        resolve(false)
      }
    )
  })
}

module.exports = { operacionExists }
