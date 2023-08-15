const Operacion = require('../../models/operacion')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { operacionExistsExcludingItself } = require('./helpers')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateOperacion = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req._id)
    const doesOperacionExists = await operacionExistsExcludingItself(id, req.timestamp)
    if (!doesOperacionExists) {
      res.status(200).json(await updateItem(id, Operacion, req))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateOperacion }
