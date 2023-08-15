const Organismo = require('../../models/organismo')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { organismoExistsExcludingItself } = require('./helpers')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateOrganismo = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req._id)
    req.tipoOrganismo._id = await isIDGood(req.tipoOrganismo._id)
    const doesOrganismoExists = await organismoExistsExcludingItself(
      id,
      req.nombre
    )
    if (!doesOrganismoExists) {
      res.status(200).json(await updateItem(id, Organismo, req))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateOrganismo }
