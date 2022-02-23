import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import CostCenter from 'src/models/CostCenter';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const {
    id,
  } = request.params;

  const {
    description,
  } = request.body;

  const costCenter = await CostCenter.update({
    _id: id,
    description: description,
  }, session);

  return response.success({
    costCenter: costCenter,
  }, 'ITEM_UPDATED');
}

export default {
  validation: parameterValidation,
  method: method,
};
