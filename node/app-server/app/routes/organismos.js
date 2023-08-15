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
  getAllOrganismos,
  getOrganismos,
  createOrganismo,
  getOrganismo,
  getFullOrganismo,
  updateOrganismo,
  deleteOrganismo
} = require('../controllers/organismos')

const {
  validateCreateOrganismo,
  validateGetOrganismo,
  validateUpdateOrganismo,
  validateDeleteOrganismo
} = require('../controllers/organismos/validators')

/*
 * Cities routes
 */

/*
 * Get all items route
 */
router.get('/all', getAllOrganismos)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  getOrganismos
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateCreateOrganismo,
  createOrganismo
)

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateGetOrganismo,
  getOrganismo
)

/*
 * Get full item route
 */
router.get(
  '/full/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateGetOrganismo,
  getFullOrganismo
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateUpdateOrganismo,
  updateOrganismo
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateDeleteOrganismo,
  deleteOrganismo
)

module.exports = router
