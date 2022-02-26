import { Request, Response } from 'express';
import { Client } from 'pg';
import User from 'src/models/User';

async function method (request: Request, response: Response, session: Client): Promise<Response> {
  const list = await User.getList(session);

  return response.success({
    list: list,
  });
}

export default {
  method: method,
};
