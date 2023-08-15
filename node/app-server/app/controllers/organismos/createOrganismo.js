const Organismo = require('../../models/organismo')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { organismoExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createOrganismo = async (req, res) => {
  try {
    req = matchedData(req)
    req.tipoOrganismo._id = await isIDGood(req.tipoOrganismo._id)
    const doesOrganismoExists = await organismoExists(req.nombre)
    if (!doesOrganismoExists) {
      res.status(201).json(await createItem(req, Organismo))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createOrganismo }
