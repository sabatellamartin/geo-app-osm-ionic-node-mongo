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
  getAllRecorridos,
  getRecorridos,
  createRecorrido,
  getRecorrido,
  updateRecorrido,
  deleteRecorrido
} = require('../controllers/recorridos')

const {
  validateCreateRecorrido,
  validateGetRecorrido,
  validateUpdateRecorrido,
  validateDeleteRecorrido
} = require('../controllers/recorridos/validators')

/*
 * Recorridos routes
 */

/*
 * Get all items route
 */
router.get('/all', getAllRecorridos)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['ADMINISTRADOR', 'PATRULLA']),
  trimRequest.all,
  getRecorridos
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization(['ADMINISTRADOR', 'PATRULLA']),
  trimRequest.all,
  validateCreateRecorrido,
  createRecorrido
)

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  roleAuthorization(['ADMINISTRADOR', 'PATRULLA']),
  trimRequest.all,
  validateGetRecorrido,
  getRecorrido
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization(['ADMINISTRADOR', 'PATRULLA']),
  trimRequest.all,
  validateUpdateRecorrido,
  updateRecorrido
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization(['ADMINISTRADOR', 'PATRULLA']),
  trimRequest.all,
  validateDeleteRecorrido,
  deleteRecorrido
)

module.exports = router
