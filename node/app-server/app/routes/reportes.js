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
  getAllReportes,
  getReportes,
  createReporte,
  getReporte,
  updateReporte,
  deleteReporte
} = require('../controllers/reportes')

const {
  validateCreateReporte,
  validateGetReporte,
  validateUpdateReporte,
  validateDeleteReporte
} = require('../controllers/reportes/validators')

/*
 * Reportes routes
 */

/*
 * Get all items route
 */
router.get('/all', getAllReportes)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['ADMINISTRADOR', 'PATRULLA']),
  trimRequest.all,
  getReportes
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization(['ADMINISTRADOR', 'PATRULLA']),
  trimRequest.all,
  validateCreateReporte,
  createReporte
)

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  roleAuthorization(['ADMINISTRADOR', 'PATRULLA']),
  trimRequest.all,
  validateGetReporte,
  getReporte
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization(['ADMINISTRADOR', 'PATRULLA']),
  trimRequest.all,
  validateUpdateReporte,
  updateReporte
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization(['ADMINISTRADOR', 'PATRULLA']),
  trimRequest.all,
  validateDeleteReporte,
  deleteReporte
)

module.exports = router
