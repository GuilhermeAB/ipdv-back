import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import User from 'src/models/User';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const {
    id,
  } = request.params;

  const list = await User.getById(id, session);

  return response.success({
    list: list,
  });
}

export default {
  validation: parameterValidation,
  method: method,
};
