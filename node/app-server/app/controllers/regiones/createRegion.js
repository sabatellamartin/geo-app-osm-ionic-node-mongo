const Region = require('../../models/region')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { regionExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createRegion = async (req, res) => {
  try {
    req = matchedData(req)
    const doesRegionExists = await regionExists(req.nombre)
    if (!doesRegionExists) {
      res.status(201).json(await createItem(req, Region))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createRegion }
