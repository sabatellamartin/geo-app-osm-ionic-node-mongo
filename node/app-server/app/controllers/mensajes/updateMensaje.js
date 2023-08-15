const Mensaje = require('../../models/mensaje')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { mensajeExistsExcludingItself } = require('./helpers')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateMensaje = async (req, res) => {
  try {
    console.log("update mensaje")
    
    req = matchedData(req)
    const id = await isIDGood(req._id)
    // req.operacion.id = await isIDGood(req.operacion._id)
    const doesMensajeExists = await mensajeExistsExcludingItself(id, req.timestamp)
    if (!doesMensajeExists) {
      res.status(200).json(await updateItem(id, Mensaje, req))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateMensaje }
