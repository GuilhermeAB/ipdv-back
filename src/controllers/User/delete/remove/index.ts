import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import User from 'src/models/User';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const {
    id,
  } = request.params;

  const user = await User.remove(id, session);

  return response.success({
    user: user,
  }, 'ITEM_REMOVED');
}

export default {
  validation: parameterValidation,
  method: method,
};
