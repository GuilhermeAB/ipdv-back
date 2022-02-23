import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import User from 'src/models/User';

async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const list = await User.getList(session);

  return response.success({
    list: list,
  });
}

export default {
  method: method,
};
