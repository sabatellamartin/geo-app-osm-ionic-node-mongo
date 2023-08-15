const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateReporte = [
  check('timestamp')
    .exists()
    .withMessage('MISSING_TIMESTAMP')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_TIMESTAMP')
    .isNumeric()
    .withMessage('NOT_NUMERIC_TIMESTAMP'),
  check('detalle')
    .exists()
    .withMessage('MISSING_DETALLE')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_DETALLE')
    .trim(),
  check('operacion._id')
    .exists()
    .withMessage('MISSING_OPERACION')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_OPERACION')
    .trim(),
  check('operacion.timestamp')
    .exists()
    .withMessage('MISSING_OPERACION_TIMESTAMP')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_OPERACION_TIMESTAMP')
    .isNumeric()
    .withMessage('NOT_NUMERIC_OPERACION_TIMESTAMP'), 
  /*check('user._id')
    .exists()
    .withMessage('MISSING_USER')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_USER')
    .trim(),*/
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreateReporte }
