const TipoOrganismo = require('../../../models/tipoOrganismo')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists excluding itself
 * @param {string} id - id of item
 * @param {string} nombre - name of item
 */
const tipoOrganismoExistsExcludingItself = (id = '', nombre = '') => {
  return new Promise((resolve, reject) => {
    TipoOrganismo.findOne(
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
          return reject(buildErrObject(422, 'INSTITUCION_ALREADY_EXISTS'))
        }

        resolve(false)
      }
    )
  })
}

module.exports = { tipoOrganismoExistsExcludingItself }
