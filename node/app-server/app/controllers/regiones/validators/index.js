const { validateCreateRegion } = require('./validateCreateRegion')
const { validateDeleteRegion } = require('./validateDeleteRegion')
const { validateGetRegion } = require('./validateGetRegion')
const { validateUpdateRegion } = require('./validateUpdateRegion')

module.exports = {
  validateCreateRegion,
  validateDeleteRegion,
  validateGetRegion,
  validateUpdateRegion
}
