const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateOrganismo = [
  check('nombre')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('abreviacion')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('acronimo')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('tipoOrganismo._id')
    .exists()
    .withMessage('MISSING_OPERACION')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_OPERACION')
    .trim(),
  check('organismo')
    .optional({nullable: true, checkFalsy: true})
    .isObject()
    .withMessage('NOT_OBJECT_ORGANISMO'), 
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreateOrganismo }
