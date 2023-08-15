const Reporte = require('../../models/reporte')
const Operacion = require('../../models/operacion')
const { createItem } = require('../../middleware/db')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { reporteExists } = require('./helpers')
const { operacionExistsExcludingItself } = require('../operaciones/helpers')
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createReporte = async (req, res) => {
  try {
    // Create reporte
    req = matchedData(req)
    req.operacion._id = await isIDGood(req.operacion._id)
    const doesReporteExists = await reporteExists(req.timestamp)
    if (!doesReporteExists) {
      const reporte = await createItem(req, Reporte)
      // Add operacion
      const doesOperacionExists = await operacionExistsExcludingItself(req.operacion._id, req.operacion.timestamp)
      if (!doesOperacionExists) {
        await updateItem(req.operacion._id, Operacion, { $push: { reportes: reporte._id } })
      }
      res.status(201).json(reporte)
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createReporte }
