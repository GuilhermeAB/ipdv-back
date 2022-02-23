import { body, param } from 'express-validator';
import getMessage from 'src/util/i18n/methods/get-message';

export default [
  param('id')
    .not().isEmpty()
    .withMessage(getMessage('ID_REQUIRED'))
    .isString()
    .withMessage(getMessage('ID_INVALID'))
    .isUUID()
    .withMessage(getMessage('ID_INVALID'))
    .trim()
    .escape(),
  body('name')
    .not().isEmpty()
    .withMessage(getMessage('NAME_REQUIRED'))
    .isString()
    .withMessage(getMessage('NAME_INVALID'))
    .isLength({ min: 3 })
    .withMessage(getMessage('NAME_MIN_LENGTH', { value: 3 }))
    .isLength({ max: 30 })
    .withMessage(getMessage('NAME_MAX_LENGTH', { value: 30 }))
    .trim()
    .escape(),
  body('role')
    .not().isEmpty()
    .withMessage(getMessage('ROLE_REQUIRED'))
    .isString()
    .withMessage(getMessage('ROLE_INVALID'))
    .isUUID()
    .withMessage(getMessage('ROLE_INVALID'))
    .trim()
    .escape(),
];
