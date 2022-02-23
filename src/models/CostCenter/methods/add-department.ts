import { ClientSession } from 'mongoose';
import Department from 'src/models/Department';
import ValidationError from 'src/util/Error/validation-error';
import CostCenter from '..';
import { CostCenterModel } from '../schema';

export default async function addDepartment (costCenterId: string, departmentId: string, session?: ClientSession): Promise<boolean> {
  if (!costCenterId || !departmentId) {
    throw new ValidationError('ID_REQUIRED');
  }

  const costCenterExists = await CostCenter.existsById(costCenterId);
  if (!costCenterExists) {
    throw new ValidationError('COST_CENTER_NOT_FOUND');
  }

  const departmentExists = await Department.existsById(departmentId);
  if (!departmentExists) {
    throw new ValidationError('DEPARTMENT_NOT_FOUND');
  }

  const alreadyHasDepartment = await CostCenter.hasDepartment(costCenterId, departmentId);
  if (alreadyHasDepartment) {
    throw new ValidationError('COST_CENTER_ALREADY_HAS_DEPARTMENT');
  }

  await CostCenterModel.findOneAndUpdate(
    { _id: costCenterId },
    {
      $push: {
        departmentList: departmentId,
      },
    },
    {
      session: session,
    },
  ).exec();

  return true;
}
