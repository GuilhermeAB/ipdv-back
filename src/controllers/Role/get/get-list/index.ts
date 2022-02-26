import { Request, Response } from 'express';
import { Client } from 'pg';
import Role from 'src/models/Role';

async function method (request: Request, response: Response, session: Client): Promise<Response> {
  const list = await Role.getList(session);

  return response.success({
    list: list,
  });
}

export default {
  method: method,
};
