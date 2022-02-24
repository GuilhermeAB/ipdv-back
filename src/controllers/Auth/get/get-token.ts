import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import Auth from 'src/models/Auth';

async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
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
