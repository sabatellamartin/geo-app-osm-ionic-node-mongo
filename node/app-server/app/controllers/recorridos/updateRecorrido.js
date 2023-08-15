const Recorrido = require('../../models/recorrido')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { recorridoExistsExcludingItself } = require('./helpers')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateRecorrido = async (req, res) => {
  try {
    console.log("update recorrido")
    
    req = matchedData(req)
    const id = await isIDGood(req._id)
    // req.operacion.id = await isIDGood(req.operacion._id)
    const doesRecorridoExists = await recorridoExistsExcludingItself(id, req.timestamp)
    if (!doesRecorridoExists) {
      res.status(200).json(await updateItem(id, Recorrido, req))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateRecorrido }
