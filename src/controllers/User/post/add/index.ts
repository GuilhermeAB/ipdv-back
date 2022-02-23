import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import User from 'src/models/User';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const {
    name,
    role,
  } = request.body;

  const user = await User.add({
    name: name,
    role: role,
  }, session);

  return response.successfulCreated({
    user: user,
  }, 'ITEM_ADDED');
}

export default {
  validation: parameterValidation,
  method: method,
};
