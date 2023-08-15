const Mensaje = require('../../models/mensaje')
const Operacion = require('../../models/operacion')
const { createItem } = require('../../middleware/db')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { mensajeExists } = require('./helpers')
const { operacionExistsExcludingItself } = require('../operaciones/helpers')
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createMensaje = async (req, res) => {
  try {
    // Create mensaje
    req = matchedData(req)
    req.operacion._id = await isIDGood(req.operacion._id)
    const doesMensajeExists = await mensajeExists(req.timestamp)
    if (!doesMensajeExists) {
      const mensaje = await createItem(req, Mensaje)
      // Add operacion
      const doesOperacionExists = await operacionExistsExcludingItself(req.operacion._id, req.operacion.timestamp)
      if (!doesOperacionExists) {
        await updateItem(req.operacion._id, Operacion, { $push: { mensajes: mensaje._id } })
      }
      res.status(201).json(mensaje)
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createMensaje }
