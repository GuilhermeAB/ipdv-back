import { Request, Response } from 'express';
import { Client } from 'pg';
import Department from 'src/models/Department';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session: Client): Promise<Response> {
  const {
    id,
  } = request.params;

  const {
    description,
  } = request.body;

  const department = await Department.update({
    id: id,
    description: description,
  }, session);

  return response.success({
    department: department,
  }, 'ITEM_UPDATED');
}

export default {
  validation: parameterValidation,
  method: method,
};
