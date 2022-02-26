import { Request, Response } from 'express';
import { Client } from 'pg';
import CostCenter from 'src/models/CostCenter';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session: Client): Promise<Response> {
  const {
    description,
  } = request.body;

  const costCenter = await CostCenter.add({
    description: description,
  }, session);

  return response.successfulCreated({
    costCenter: costCenter,
  }, 'ITEM_ADDED');
}

export default {
  validation: parameterValidation,
  method: method,
};
