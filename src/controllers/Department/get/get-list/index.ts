import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import Department from 'src/models/Department';

async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const list = await Department.getList(session);

  return response.success({
    list: list,
  });
}

export default {
  method: method,
};
