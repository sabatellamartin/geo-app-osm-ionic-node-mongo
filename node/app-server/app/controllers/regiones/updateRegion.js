const Region = require('../../models/region')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { regionExistsExcludingItself } = require('./helpers')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateRegion = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    const doesRegionExists = await regionExistsExcludingItself(id, req.nombre)
    if (!doesRegionExists) {
      res.status(200).json(await updateItem(id, Region, req))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateRegion }
