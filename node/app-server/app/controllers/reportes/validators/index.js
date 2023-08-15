const { validateCreateReporte } = require('./validateCreateReporte')
const { validateDeleteReporte } = require('./validateDeleteReporte')
const { validateGetReporte } = require('./validateGetReporte')
const { validateUpdateReporte } = require('./validateUpdateReporte')

module.exports = {
  validateCreateReporte,
  validateDeleteReporte,
  validateGetReporte,
  validateUpdateReporte
}