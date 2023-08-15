const { validateCreateEstado } = require('./validateCreateEstado')
const { validateDeleteEstado } = require('./validateDeleteEstado')
const { validateGetEstado } = require('./validateGetEstado')
const { validateUpdateEstado } = require('./validateUpdateEstado')

module.exports = {
  validateCreateEstado,
  validateDeleteEstado,
  validateGetEstado,
  validateUpdateEstado
}