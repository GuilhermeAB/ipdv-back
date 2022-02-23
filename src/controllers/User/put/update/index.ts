import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import User from 'src/models/User';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const {
    id,
  } = request.params;

  const {
    name,
    role,
  } = request.body;

  const user = await User.update({
    _id: id,
    name: name,
    role: role,
  }, session);

  return response.success({
    user: user,
  }, 'ITEM_UPDATED');
}

export default {
  validation: parameterValidation,
  method: method,
};
