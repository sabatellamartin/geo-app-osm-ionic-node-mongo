const { matchedData } = require('express-validator')
const User = require('../../models/user')
const { isIDGood, handleError } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getFullUser = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    let user = await User.findById(id)
      .populate('fuerza')
      .populate('division')
      .populate('brigada')
      .populate('unidad')
      
    res.status(200).json(user)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getFullUser }