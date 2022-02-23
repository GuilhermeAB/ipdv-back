import type { Response, Request } from 'express';

/**
 * Clear cookie
 *
 * @param {string} key Secret cookie key name
 * @param {Response} response Response object
 */
export function cookieClear (key: string, response: Response): void {
  response.cookie(key, undefined);
  response.clearCookie(key);
}

/**
 * Forbidden
 *
 * @param {Response} response Response object
 * @returns Response object with status code 403 and forbidden message
 */
export function forbidden (response: Response, messageKey?: string): Response {
  const {
    SECRET_HEADER_NAME,
  } = process.env;

  cookieClear(SECRET_HEADER_NAME!, response);

  return response.forbidden(undefined, messageKey || 'SIGN_IN_REQUIRED');
}

/**
 * Get header by key name
 *
 * @param key - Header name
 * @param request - Request object
 * @returns the string header or undefined if not found
 */
export function getHeader (key: string, request: Request): string | string[] | boolean | undefined {
  const header = request.headers && request.headers[key];

  return header;
}
