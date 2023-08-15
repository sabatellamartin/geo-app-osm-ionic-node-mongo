const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateOperacion = [
  check('timestamp')
    .exists()
    .withMessage('MISSING_TIMESTAMP')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_TIMESTAMP')
    .isNumeric()
    .withMessage('NOT_NUMERIC_TIMESTAMP'),
  check('nombre')
    .exists()
    .withMessage('MISSING_NOMBRE')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_NOMBRE')
    .trim(),
  check('tipo')
    .exists()
    .withMessage('MISSING_TIPO')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_TIPO')
    .isIn(['Aérea', 'Terrestre', 'Fluvial', 'Marítima', 'Op. Control'])
    .trim(),/*
  check('estado')
    .exists()
    .withMessage('MISSING_ESTADO')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_ESTADO')
    .isIn(['Nueva', 'Iniciada', 'Pausa', 'Finalizada'])
    .trim(),*/
  check('oficiales')
    .exists()
    .withMessage('MISSING_OFICIALES')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_OFICIALES')
    .isNumeric()
    .withMessage('NOT_NUMERIC_OFICIALES')
    .isLength({ min: 0, max: 3 }),
  check('subalternos')
    .exists()
    .withMessage('MISSING_SUBALTERNOS')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_SUBALTERNOS')
    .isNumeric()
    .withMessage('NOT_NUMERIC_SUBALTERNOS')
    .isLength({ min: 0, max: 3 }),
  check('vehiculos')
    .exists()
    .withMessage('MISSING_VEHICULOS')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY_VEHICULOS')
    .isNumeric()
    .withMessage('NOT_NUMERIC_VEHICULOS')
    .isLength({ min: 0, max: 3 }),
  check('timestampFin')
    .optional({nullable: true, checkFalsy: true})
    .isNumeric()
    .withMessage('NOT_NUMERIC_TIMESTAMP_FIN'),
  check('timestampInicio')
    .optional({nullable: true, checkFalsy: true})
    .isNumeric()
    .withMessage('NOT_NUMERIC_TIMESTAMP_INICIO'),
  check('timestampPausa')
    .optional({nullable: true, checkFalsy: true})
    .isNumeric()
    .withMessage('NOT_NUMERIC_TIMESTAMP_PAUSA'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreateOperacion }
