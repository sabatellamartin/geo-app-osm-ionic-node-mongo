const User = require('../../../models/user')
const { itemNotFound, isIDGood } = require('../../../middleware/utils')

/**
 * Finds user by ID
 * @param {string} id - user´s id
 */
const findUserFullById = async (userId = '') => {
  const id = await isIDGood(userId)
  return await User.findById(id, async (err, item) => {
    try {
      await itemNotFound(err, item, 'USER_DOES_NOT_EXIST')
      resolve(item)
    } catch (error) {
      reject(error)
    }
  })
  .populate('fuerza')
  .populate('division')
  .populate('brigada')
  .populate('division')
}

module.exports = { findUserFullById }
