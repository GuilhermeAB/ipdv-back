import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import Department from 'src/models/Department';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const {
    id,
    userId,
  } = request.params;

  const result = await Department.removeUser(userId, id, session);

  return response.success({
    removed: result,
  }, 'ITEM_REMOVED');
}

export default {
  validation: parameterValidation,
  method: method,
};
