import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import CostCenter from 'src/models/CostCenter';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const {
    id,
  } = request.params;

  const result = await CostCenter.remove(id, session);

  return response.success({
    removed: result,
  }, 'ITEM_REMOVED');
}

export default {
  validation: parameterValidation,
  method: method,
};
