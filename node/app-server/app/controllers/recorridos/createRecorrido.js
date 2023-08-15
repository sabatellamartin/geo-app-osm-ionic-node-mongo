const Recorrido = require('../../models/recorrido')
const Operacion = require('../../models/operacion')
const { createItem } = require('../../middleware/db')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { recorridoExists } = require('./helpers')
const { operacionExistsExcludingItself } = require('../operaciones/helpers')
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createRecorrido = async (req, res) => {
  try {
    // Create recorrido
    req = matchedData(req)
    req.operacion._id = await isIDGood(req.operacion._id)
    const doesRecorridoExists = await recorridoExists(req.timestamp)
    if (!doesRecorridoExists) {
      const recorrido = await createItem(req, Recorrido)
      // Add operacion
      const doesOperacionExists = await operacionExistsExcludingItself(req.operacion._id, req.operacion.timestamp)
      if (!doesOperacionExists) {
        await updateItem(req.operacion._id, Operacion, { $push: { recorridos: recorrido._id } })
      }
      res.status(201).json(recorrido)
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createRecorrido }
