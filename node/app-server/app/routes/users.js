const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const { roleAuthorization } = require('../controllers/auth')

const {
  getUsers,
  createUser,
  getUser,
  getFullUser,
  updateUser,
  deleteUser
} = require('../controllers/users')

const {
  validateCreateUser,
  validateGetUser,
  validateUpdateUser,
  validateDeleteUser
} = require('../controllers/users/validators')

/*
 * Users routes
 */

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR' ]),
  trimRequest.all,
  getUsers
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR' ]),
  trimRequest.all,
  validateCreateUser,
  createUser
)

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateGetUser,
  getUser
)

/*
 * Get full item route
 */
router.get(
  '/full/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateGetUser,
  getFullUser
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR' ]),
  trimRequest.all,
  validateUpdateUser,
  updateUser
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR' ]),
  trimRequest.all,
  validateDeleteUser,
  deleteUser
)

module.exports = router
