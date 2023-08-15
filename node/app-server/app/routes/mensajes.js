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
  getAllMensajes,
  getMensajes,
  createMensaje,
  getMensaje,
  updateMensaje,
  deleteMensaje
} = require('../controllers/mensajes')

const {
  validateCreateMensaje,
  validateGetMensaje,
  validateUpdateMensaje,
  validateDeleteMensaje
} = require('../controllers/mensajes/validators')

/*
 * Mensajes routes
 */

/*
 * Get all items route
 */
router.get('/all', getAllMensajes)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['ADMINISTRADOR', 'PATRULLA']),
  trimRequest.all,
  getMensajes
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateCreateMensaje,
  createMensaje
)

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateGetMensaje,
  getMensaje
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateUpdateMensaje,
  updateMensaje
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateDeleteMensaje,
  deleteMensaje
)

module.exports = router
