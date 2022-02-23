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
  body('description')
    .not().isEmpty()
    .withMessage(getMessage('DESCRIPTION_REQUIRED'))
    .isString()
    .withMessage(getMessage('DESCRIPTION_INVALID'))
    .isLength({ min: 3 })
    .withMessage(getMessage('DESCRIPTION_MIN_LENGTH', { value: 3 }))
    .isLength({ max: 40 })
    .withMessage(getMessage('DESCRIPTION_MAX_LENGTH', { value: 40 }))
    .trim()
    .escape(),
];
