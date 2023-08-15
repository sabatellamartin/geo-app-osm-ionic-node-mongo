const Estado = require('../../models/estado')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { estadoExistsExcludingItself } = require('./helpers')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateEstado = async (req, res) => {
  try {
    console.log("update estado")
    
    req = matchedData(req)
    const id = await isIDGood(req._id)
    // req.operacion.id = await isIDGood(req.operacion._id)
    const doesEstadoExists = await estadoExistsExcludingItself(id, req.timestamp)
    if (!doesEstadoExists) {
      res.status(200).json(await updateItem(id, Estado, req))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateEstado }
