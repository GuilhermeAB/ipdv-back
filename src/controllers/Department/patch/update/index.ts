import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import Department from 'src/models/Department';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const {
    id,
  } = request.params;

  const {
    description,
  } = request.body;

  const department = await Department.update({
    _id: id,
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
