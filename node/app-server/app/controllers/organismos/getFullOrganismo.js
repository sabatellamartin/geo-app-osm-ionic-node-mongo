const { matchedData } = require('express-validator')
const Organismo = require('../../models/organismo')
const { isIDGood, handleError } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getFullOrganismo = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    let organismo = await Organismo.findById(id)
      .populate('tipoOrganismo')
      .populate('organismo')
      
    res.status(200).json(organismo)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getFullOrganismo }
