import { Request, Response } from 'express';
import { Client } from 'pg';
import Department from 'src/models/Department';

async function method (request: Request, response: Response, session: Client): Promise<Response> {
  const list = await Department.getList(session);

  return response.success({
    list: list,
  });
}

export default {
  method: method,
};
