import { NextFunction, Request, Response } from 'express';
import { forbidden } from './util';

export default function isVerified (request: Request, response: Response, next: NextFunction): void {
  const {
    accountIsVerified,
  } = request;

  if (!accountIsVerified) {
    forbidden(response, 'VERIFY_ACCOUNT_REQUIRED');
  } else {
    next();
  }
}
