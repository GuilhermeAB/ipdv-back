import { Request, Response } from 'express';
import { Client } from 'pg';
import User from 'src/models/User';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session: Client): Promise<Response> {
  const {
    name,
    role,
  } = request.body;

  const user = await User.add({
    name: name,
    role_id: role,
  }, session);

  return response.successfulCreated({
    user: user,
  }, 'ITEM_ADDED');
}

export default {
  validation: parameterValidation,
  method: method,
};
