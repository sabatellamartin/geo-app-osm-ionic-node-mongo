const { validateResult } = require('../../../middleware/utils')
const validator = require('validator')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateUser = [
  check('name')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('email')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_NOT_VALID'),
  check('password')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isLength({
      min: 5
    })
    .withMessage('PASSWORD_TOO_SHORT_MIN_5'),
  check('role')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isIn(['user', 'admin', 'ADMINISTRADOR', 'COMANDO', 'OPERACIONES', 'PATRULLA' ])
    .withMessage('USER_NOT_IN_KNOWN_ROLE'),
  check('phone')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('city')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('country')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('fuerza')
    .optional({nullable: true, checkFalsy: true})
    .isObject()
    .withMessage('NOT_OBJECT_FUERZA'),
  check('division')
    .optional({nullable: true, checkFalsy: true})
    .isObject()
    .withMessage('NOT_OBJECT_DIVISION'),
  check('brigada')
    .optional({nullable: true, checkFalsy: true})
    .isObject()
    .withMessage('NOT_OBJECT_BRIGADA'),
  check('unidad')
    .optional({nullable: true, checkFalsy: true})
    .isObject()
    .withMessage('NOT_OBJECT_UNIDAD'),/*
  check('urlTwitter')
    .optional()
    .custom((v) => (v === '' ? true : validator.isURL(v)))
    .withMessage('NOT_A_VALID_URL'),
  check('urlGitHub')
    .optional()
    .custom((v) => (v === '' ? true : validator.isURL(v)))
    .withMessage('NOT_A_VALID_URL'),*/
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreateUser }
