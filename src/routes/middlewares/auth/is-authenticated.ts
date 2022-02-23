import { NextFunction, Request, Response } from 'express';
import ValidationError from 'src/util/Error/validation-error';
import { forbidden, getHeader } from './util';

export default function isAuthenticated (request: Request, response: Response, next: NextFunction): void {
  const {
    HEADER_KONG_AUTH_PERSON_ID,
    HEADER_KONG_AUTH_ACCOUNT_ID,
    HEADER_KONG_AUTH_TOKEN_ID,
    HEADER_KONG_AUTH_IS_VERIFIED_ACCOUNT,
  } = process.env;

  if (!HEADER_KONG_AUTH_PERSON_ID
      || !HEADER_KONG_AUTH_ACCOUNT_ID
      || !HEADER_KONG_AUTH_TOKEN_ID
      || !HEADER_KONG_AUTH_IS_VERIFIED_ACCOUNT) {
    throw new ValidationError('INTERNAL_ERROR_INVALID_ENV');
  }

  const personId = getHeader(HEADER_KONG_AUTH_PERSON_ID, request);
  const accountId = getHeader(HEADER_KONG_AUTH_ACCOUNT_ID, request);
  const tokenId = getHeader(HEADER_KONG_AUTH_TOKEN_ID, request);
  const accountIsVerified = getHeader(HEADER_KONG_AUTH_IS_VERIFIED_ACCOUNT, request);

  if (!personId || !accountId || !tokenId) {
    forbidden(response);
  } else {
    request.tokenId = tokenId as string;
    request.accountId = accountId as string;
    request.personId = personId as string;
    request.accountIsVerified = accountIsVerified as boolean | undefined;

    next();
  }
}
