import { Request, Response } from 'express';
import { Client } from 'pg';
import User from 'src/models/User';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session: Client): Promise<Response> {
  const {
    id,
  } = request.params;

  const {
    name,
    role,
  } = request.body;

  const user = await User.update({
    id: id,
    name: name,
    role_id: role,
  }, session);

  return response.success({
    user: user,
  }, 'ITEM_UPDATED');
}

export default {
  validation: parameterValidation,
  method: method,
};
