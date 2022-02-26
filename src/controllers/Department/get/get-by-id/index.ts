import { Request, Response } from 'express';
import { Client } from 'pg';
import Department from 'src/models/Department';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session: Client): Promise<Response> {
  const {
    id,
  } = request.params;

  const item = await Department.getById(id, session);

  return response.success({
    item: item,
  });
}

export default {
  validation: parameterValidation,
  method: method,
};
