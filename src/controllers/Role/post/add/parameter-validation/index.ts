import { body } from 'express-validator';
import getMessage from 'src/util/i18n/methods/get-message';

export default [
  body('description')
    .not().isEmpty()
    .withMessage(getMessage('DESCRIPTION_REQUIRED'))
    .isString()
    .withMessage(getMessage('DESCRIPTION_INVALID'))
    .isLength({ min: 3 })
    .withMessage(getMessage('DESCRIPTION_MIN_LENGTH', { value: 3 }))
    .isLength({ max: 30 })
    .withMessage(getMessage('DESCRIPTION_MAX_LENGTH', { value: 30 }))
    .trim()
    .escape(),
];
