const { createUser } = require('./createUser')
const { deleteUser } = require('./deleteUser')
const { getUser } = require('./getUser')
const { getFullUser } = require('./getFullUser')
const { getUsers } = require('./getUsers')
const { updateUser } = require('./updateUser')

module.exports = {
  createUser,
  deleteUser,
  getUser,
  getFullUser,
  getUsers,
  updateUser
}
