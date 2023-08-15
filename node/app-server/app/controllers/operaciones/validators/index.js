const { validateCreateOperacion } = require('./validateCreateOperacion')
const { validateDeleteOperacion } = require('./validateDeleteOperacion')
const { validateGetOperacion } = require('./validateGetOperacion')
const { validateUpdateOperacion } = require('./validateUpdateOperacion')

module.exports = {
  validateCreateOperacion,
  validateDeleteOperacion,
  validateGetOperacion,
  validateUpdateOperacion
}