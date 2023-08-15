const Operacion = require('../../models/operacion')
const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')
const { deleteItem } = require('../../middleware/db')

const Mensaje = require('../../models/mensaje')
const Recorrido = require('../../models/recorrido')
const Reporte = require('../../models/reporte')
const Estado = require('../../models/estado')

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteOperacion = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    /* Delete all childs documents */
    await Mensaje.deleteMany({ operacion: id });
    await Recorrido.deleteMany({ operacion: id });
    await Reporte.deleteMany({ operacion: id });
    await Estado.deleteMany({ operacion: id });
    res.status(200).json(await deleteItem(id, Operacion))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { deleteOperacion }
