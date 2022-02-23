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
  body('departmentId')
    .not().isEmpty()
    .withMessage(getMessage('ID_REQUIRED'))
    .isString()
    .withMessage(getMessage('ID_INVALID'))
    .isUUID()
    .withMessage(getMessage('ID_INVALID'))
    .trim()
    .escape(),
];
