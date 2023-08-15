const Operacion = require('../../../models/operacion')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a operacion already exists excluding itself
 * @param {string} id - id of item
 * @param {string} timestamp - name of item
 */
const operacionExistsExcludingItself = (id = '', timestamp = '') => {
  return new Promise((resolve, reject) => {
    Operacion.findOne(
      {
        timestamp,
        _id: {
          $ne: id
        }
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

module.exports = { operacionExistsExcludingItself }
