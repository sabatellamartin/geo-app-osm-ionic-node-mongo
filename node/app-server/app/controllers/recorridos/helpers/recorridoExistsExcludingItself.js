const Recorrido = require('../../../models/recorrido')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a recorrido already exists excluding itself
 * @param {string} id - id of item
 * @param {string} timestamp - timestamp of item
 */
const recorridoExistsExcludingItself = (id = '', timestamp = '') => {
  return new Promise((resolve, reject) => {
    Recorrido.findOne(
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
          return reject(buildErrObject(422, 'REPORTE_ALREADY_EXISTS'))
        }

        resolve(false)
      }
    )
  })
}

module.exports = { recorridoExistsExcludingItself }
