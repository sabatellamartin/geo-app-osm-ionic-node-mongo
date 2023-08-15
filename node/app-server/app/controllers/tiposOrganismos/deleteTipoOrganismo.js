const TipoOrganismo = require('../../models/tipoOrganismo')
const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')
const { deleteItem } = require('../../middleware/db')

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteTipoOrganismo = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await deleteItem(id, TipoOrganismo))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { deleteTipoOrganismo }
