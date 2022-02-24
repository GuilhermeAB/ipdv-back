import { sign } from 'jsonwebtoken';
import ValidationError from 'src/util/Error/validation-error';

export default function getToken (): string {
  const {
    SECRET_TOKEN_KEY,
    SECRET_TOKEN_TIMEOUT,
  } = process.env;

  if (!SECRET_TOKEN_KEY || !SECRET_TOKEN_TIMEOUT) {
    throw new ValidationError('INTERNAL_ERROR_INVALID_ENV');
  }

  const token = sign(
    {
      payload: 'dummy',
    },
    SECRET_TOKEN_KEY,
    {
      algorithm: 'HS256',
      expiresIn: SECRET_TOKEN_TIMEOUT,
    },
  );

  return token;
}
