const { validateCreateOrganismo } = require('./validateCreateOrganismo')
const { validateDeleteOrganismo } = require('./validateDeleteOrganismo')
const { validateGetOrganismo } = require('./validateGetOrganismo')
const { validateUpdateOrganismo } = require('./validateUpdateOrganismo')

module.exports = {
  validateCreateOrganismo,
  validateDeleteOrganismo,
  validateGetOrganismo,
  validateUpdateOrganismo
}
