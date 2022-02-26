import { Request, Response } from 'express';
import { Client } from 'pg';
import Auth from 'src/models/Auth';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function method (request: Request, response: Response, session: Client): Promise<Response> {
  const {
    SECRET_TOKEN_NAME,
  } = process.env;

  const token = Auth.getToken();

  response.cookie(SECRET_TOKEN_NAME!, token);

  return response.success({
    authenticated: true,
  });
}

export default {
  method: method,
};
