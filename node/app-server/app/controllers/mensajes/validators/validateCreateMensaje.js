const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateMensaje = [
  check('timestamp')
    .exists()
    .withMessage('MISSING_TIMESTAMP')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_TIMESTAMP')
    .isNumeric()
    .withMessage('NOT_NUMERIC_TIMESTAMP'),
  check('texto')
    .exists()
    .withMessage('MISSING_TEXTO')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_TEXTO')
    .trim(),
  check('estado')
    .exists()
    .withMessage('MISSING_ESTADO')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_ESTADO')
    .isIn(['Listo', 'Enviado', 'Recibido', 'Visto'])
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
  check('user._id')
    .exists()
    .withMessage('MISSING_USER')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_USER')
    .trim(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreateMensaje }
