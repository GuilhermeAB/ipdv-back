import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import Role from 'src/models/Role';

async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const list = await Role.getList(session);

  return response.success({
    list: list,
  });
}

export default {
  method: method,
};
