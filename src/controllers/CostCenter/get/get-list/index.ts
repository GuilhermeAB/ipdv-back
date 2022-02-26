import { Request, Response } from 'express';
import { Client } from 'pg';
import CostCenter from 'src/models/CostCenter';

async function method (request: Request, response: Response, session: Client): Promise<Response> {
  const list = await CostCenter.getList(session);

  return response.success({
    list: list,
  });
}

export default {
  method: method,
};
