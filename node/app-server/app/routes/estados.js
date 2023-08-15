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
  getAllEstados,
  getEstados,
  createEstado,
  getEstado,
  updateEstado,
  deleteEstado
} = require('../controllers/estados')

const {
  validateCreateEstado,
  validateGetEstado,
  validateUpdateEstado,
  validateDeleteEstado
} = require('../controllers/estados/validators')

/*
 * Estados routes
 */

/*
 * Get all items route
 */
router.get('/all', getAllEstados)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['ADMINISTRADOR', 'COMANDO']),
  trimRequest.all,
  getEstados
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateCreateEstado,
  createEstado
)

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateGetEstado,
  getEstado
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateUpdateEstado,
  updateEstado
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO' ]),
  trimRequest.all,
  validateDeleteEstado,
  deleteEstado
)

module.exports = router
