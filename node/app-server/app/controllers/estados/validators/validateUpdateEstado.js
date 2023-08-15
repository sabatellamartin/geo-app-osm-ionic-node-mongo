const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates update item request
 */
const validateUpdateEstado = [
  check('tipo')
    .exists()
    .withMessage('MISSING_ESTADO')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_ESTADO')
    .isIn(['Creada', 'Activa', 'Pausa', 'Suspendida', 'Finalizada'])
    .trim(),
  check('timestamp')
    .exists()
    .withMessage('MISSING_TIMESTAMP')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_TIMESTAMP')
    .isNumeric()
    .withMessage('NOT_NUMERIC_TIMESTAMP'),
  check('_id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateUpdateEstado }
