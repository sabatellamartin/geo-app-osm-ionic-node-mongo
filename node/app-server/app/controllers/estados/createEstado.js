const Estado = require('../../models/estado')
const Operacion = require('../../models/operacion')
const { createItem } = require('../../middleware/db')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { estadoExists } = require('./helpers')
const { operacionExistsExcludingItself } = require('../operaciones/helpers')
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createEstado = async (req, res) => {
  try {
    // Create estado
    req = matchedData(req)
    req.operacion._id = await isIDGood(req.operacion._id)
    const doesEstadoExists = await estadoExists(req.timestamp)
    if (!doesEstadoExists) {
      const estado = await createItem(req, Estado)
      // Add operacion
      const doesOperacionExists = await operacionExistsExcludingItself(req.operacion._id, req.operacion.timestamp)
      if (!doesOperacionExists) {
        await updateItem(req.operacion._id, Operacion, { $push: { estados: estado._id } })
      }
      res.status(201).json(estado)
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createEstado }
