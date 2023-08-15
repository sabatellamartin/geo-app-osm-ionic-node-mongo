const Operacion = require('../../models/operacion')
const { createItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { operacionExists } = require('./helpers')
const { getUserIdFromToken, findUserById } = require('../auth/helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createOperacion = async (req, res) => {
  try {

    /* User */
    const tokenEncrypted = req.headers.authorization
    .replace('Bearer ', '')
    .trim()
    let userId = await getUserIdFromToken(tokenEncrypted)
    userId = await isIDGood(userId)
    const user = await findUserById(userId)

    req = matchedData(req)

    req.user = user;
    const doesOperacionExists = await operacionExists(req.timestamp)
    if (!doesOperacionExists) {
      res.status(201).json(await createItem(req, Operacion))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createOperacion }
