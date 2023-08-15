const Reporte = require('../../models/reporte')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { reporteExistsExcludingItself } = require('./helpers')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateReporte = async (req, res) => {
  try {
    console.log("update reporte")
    
    req = matchedData(req)
    const id = await isIDGood(req._id)
    const doesReporteExists = await reporteExistsExcludingItself(id, req.timestamp)
    if (!doesReporteExists) {
      res.status(200).json(await updateItem(id, Reporte, req))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateReporte }
