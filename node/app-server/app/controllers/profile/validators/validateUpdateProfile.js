const { validateResult } = require('../../../middleware/utils')
const validator = require('validator')
const { check } = require('express-validator')

/**
 * Validates update profile request
 */
const validateUpdateProfile = [
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
    .trim(),
  check('phone')
    .optional({nullable: true, checkFalsy: true})
    .trim(),
  check('city')
    .optional({nullable: true, checkFalsy: true})
    .trim(),
  check('country')
    .optional({nullable: true, checkFalsy: true})
    .trim(),
  check('urlTwitter')
    .optional()
    .custom((v) => (v === '' ? true : validator.isURL(v)))
    .withMessage('NOT_A_VALID_URL'),
  check('urlGitHub')
    .optional()
    .custom((v) => (v === '' ? true : validator.isURL(v)))
    .withMessage('NOT_A_VALID_URL'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateUpdateProfile }
