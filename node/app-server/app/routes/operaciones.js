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
  getAllOperaciones,
  getOperaciones,
  createOperacion,
  getOperacion,
  getFullOperacion,
  updateOperacion,
  deleteOperacion
} = require('../controllers/operaciones')

const {
  validateCreateOperacion,
  validateGetOperacion,
  validateUpdateOperacion,
  validateDeleteOperacion
} = require('../controllers/operaciones/validators')

/*
 * Operaciones routes
 */

/*
 * Get all items route
 */
router.get('/all', getAllOperaciones)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  getOperaciones
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateCreateOperacion,
  createOperacion
)

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateGetOperacion,
  getOperacion
)

/*
 * Get full item route
 */
router.get(
  '/full/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateGetOperacion,
  getFullOperacion
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateUpdateOperacion,
  updateOperacion
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateDeleteOperacion,
  deleteOperacion
)

module.exports = router
