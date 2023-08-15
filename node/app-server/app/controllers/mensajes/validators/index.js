const { validateCreateMensaje } = require('./validateCreateMensaje')
const { validateDeleteMensaje } = require('./validateDeleteMensaje')
const { validateGetMensaje } = require('./validateGetMensaje')
const { validateUpdateMensaje } = require('./validateUpdateMensaje')

module.exports = {
  validateCreateMensaje,
  validateDeleteMensaje,
  validateGetMensaje,
  validateUpdateMensaje
}