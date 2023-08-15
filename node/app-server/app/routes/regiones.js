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
  getAllRegiones,
  getRegiones,
  createRegion,
  getRegion,
  updateRegion,
  deleteRegion
} = require('../controllers/regiones')

const {
  validateCreateRegion,
  validateGetRegion,
  validateUpdateRegion,
  validateDeleteRegion
} = require('../controllers/regiones/validators')

/*
 * Cities routes
 */

/*
 * Get all items route
 */
router.get('/all', getAllRegiones)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  getRegiones
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateCreateRegion,
  createRegion
)

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateGetRegion,
  getRegion
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateUpdateRegion,
  updateRegion
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateDeleteRegion,
  deleteRegion
)

module.exports = router
