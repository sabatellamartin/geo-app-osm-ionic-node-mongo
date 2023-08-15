const TipoOrganismo = require('../../models/tipoOrganismo')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { tipoOrganismoExistsExcludingItself } = require('./helpers')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateTipoOrganismo = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    const doesTipoOrganismoExists = await tipoOrganismoExistsExcludingItself(
      id,
      req.nombre
    )
    if (!doesTipoOrganismoExists) {
      res.status(200).json(await updateItem(id, TipoOrganismo, req))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateTipoOrganismo }
