import { Request, Response } from 'express';
import { Client } from 'pg';
import User from 'src/models/User';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session: Client): Promise<Response> {
  const {
    id,
  } = request.params;

  const item = await User.getById(id, session);

  return response.success({
    item: item,
  });
}

export default {
  validation: parameterValidation,
  method: method,
};
