const { matchedData } = require('express-validator')
const Estado = require('../../models/estado')
const { getItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getEstado = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Estado))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getEstado }
