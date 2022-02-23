import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import CostCenter from 'src/models/CostCenter';

async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const list = await CostCenter.getList(session);

  return response.success({
    list: list,
  });
}

export default {
  method: method,
};
