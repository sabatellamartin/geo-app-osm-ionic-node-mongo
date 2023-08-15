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
  getAllTiposOrganismos,
  getTiposOrganismos,
  createTipoOrganismo,
  getTipoOrganismo,
  updateTipoOrganismo,
  deleteTipoOrganismo
} = require('../controllers/tiposOrganismos')

const {
  validateCreateTipoOrganismo,
  validateGetTipoOrganismo,
  validateUpdateTipoOrganismo,
  validateDeleteTipoOrganismo
} = require('../controllers/tiposOrganismos/validators')

/*
 * Cities routes
 */

/*
 * Get all items route
 */
router.get('/all', getAllTiposOrganismos)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  getTiposOrganismos
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR' ]),
  trimRequest.all,
  validateCreateTipoOrganismo,
  createTipoOrganismo
)

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateGetTipoOrganismo,
  getTipoOrganismo
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR' ]),
  trimRequest.all,
  validateUpdateTipoOrganismo,
  updateTipoOrganismo
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization([ 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ]),
  trimRequest.all,
  validateDeleteTipoOrganismo,
  deleteTipoOrganismo
)

module.exports = router
