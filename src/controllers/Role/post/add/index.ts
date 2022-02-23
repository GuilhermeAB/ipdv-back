import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import Role from 'src/models/Role';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const {
    description,
  } = request.body;

  const role = await Role.add({
    description: description,
  }, session);

  return response.successfulCreated({
    role: role,
  }, 'ITEM_ADDED');
}

export default {
  validation: parameterValidation,
  method: method,
};
