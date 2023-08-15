const { matchedData } = require('express-validator')
const Operacion = require('../../models/operacion')
const { getItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const util = require('util')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getFullOperacion = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)

    //let operacion = await getItem(id, Operacion)
    let operacion = await Operacion.findById(id)
      .populate('user')
      .populate('mensajes')
      .populate('recorridos')
      .populate('reportes')
      .populate('estados')
      
      // alternative shortcut
      // console.log(util.inspect(operacion, false, null, true /* enable colors */))

    res.status(200).json(operacion)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getFullOperacion }
