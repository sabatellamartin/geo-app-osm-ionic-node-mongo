const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateRecorrido = [
  check('timestamp')
    .exists()
    .withMessage('MISSING_TIMESTAMP')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_TIMESTAMP')
    .isNumeric()
    .withMessage('NOT_NUMERIC_TIMESTAMP'),
  check("posiciones")  
    .not()  
    .isEmpty()
    .withMessage('IS_EMPTY_POSICIONES'),
  check("posiciones.*.timestamp")  
    .exists()
    .withMessage('MISSING_POSICION_TIMESTAMP')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_POSICION_TIMESTAMP')
    .isNumeric()
    .withMessage('NOT_NUMERIC_POSICION_TIMESTAMP'),
  check("posiciones.*.coordenada")
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_COORDENADA'),    
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
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreateRecorrido }
