const { matchedData } = require('express-validator')
const Operacion = require('../../models/operacion')
const { getItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getOperacion = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req._id)
    res.status(200).json(await getItem(id, Operacion))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getOperacion }
