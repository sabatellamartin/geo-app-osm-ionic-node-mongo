const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Gets profile from database by id
 * @param {string} id - user id
 */
const getProfileFromDB = (id = '') => {
  return new Promise((resolve, reject) => {
    User.findById(id, '-_id -updatedAt -createdAt', async (err, user) => {
      try {
        await itemNotFound(err, user, 'NOT_FOUND')
        resolve(user)
      } catch (error) {
        reject(error)
      }
    })
    .populate('fuerza')
    .populate('division')
    .populate('brigada')
    .populate('unidad')
  })
}

module.exports = { getProfileFromDB }
