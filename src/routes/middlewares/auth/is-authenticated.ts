import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import ValidationError from 'src/util/Error/validation-error';
import { forbidden } from './util';

export default function isAuthenticated (request: Request, response: Response, next: NextFunction): void {
  const {
    SECRET_TOKEN_NAME,
    SECRET_TOKEN_KEY,
  } = process.env;

  if (!SECRET_TOKEN_NAME || !SECRET_TOKEN_KEY) {
    throw new ValidationError('INTERNAL_ERROR_INVALID_ENV');
  }

  try {
    const token: string | undefined = request.cookies && request.cookies.token;
    const isValid = token && verify(token, SECRET_TOKEN_KEY);

    if (isValid) {
      next();
    } else {
      forbidden(response);
    }
  } catch (err) {
    forbidden(response);
  }
}
