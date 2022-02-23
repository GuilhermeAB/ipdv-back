import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import Department from 'src/models/Department';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const {
    id,
  } = request.params;

  const {
    userId,
  } = request.body;

  const result = await Department.addUser(userId, id, session);

  return response.successfulCreated({
    result: result,
  }, 'ITEM_ADDED');
}

export default {
  validation: parameterValidation,
  method: method,
};
