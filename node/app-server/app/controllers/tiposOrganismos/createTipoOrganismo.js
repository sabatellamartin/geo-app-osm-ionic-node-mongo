const TipoOrganismo = require('../../models/tipoOrganismo')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { tipoOrganismoExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createTipoOrganismo = async (req, res) => {
  try {
    req = matchedData(req)
    const doesTipoOrganismoExists = await tipoOrganismoExists(req.nombre)
    if (!doesTipoOrganismoExists) {
      res.status(201).json(await createItem(req, TipoOrganismo))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createTipoOrganismo }
