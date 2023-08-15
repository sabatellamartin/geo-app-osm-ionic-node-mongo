const { matchedData } = require('express-validator')
const Organismo = require('../../models/organismo')
const { getItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getOrganismo = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req._id)
    res.status(200).json(await getItem(id, Organismo))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getOrganismo }
