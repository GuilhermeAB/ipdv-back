import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import CostCenter from 'src/models/CostCenter';
import parameterValidation from './parameter-validation';

async function method (request: Request, response: Response, session?: ClientSession): Promise<Response> {
  const {
    id,
  } = request.params;

  const {
    departmentId,
  } = request.body;

  const result = await CostCenter.addDepartment(id, departmentId, session);

  return response.success({
    result: result,
  }, 'ITEM_ADDED');
}

export default {
  validation: parameterValidation,
  method: method,
};
