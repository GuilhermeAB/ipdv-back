import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import Department from 'src/models/Department';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const {
    description,
  } = request.body;

  const department = await Department.add({
    description: description,
  }, session);

  return response.successfulCreated({
    department: department,
  }, 'ITEM_ADDED');
}

export default {
  validation: parameterValidation,
  method: method,
};
