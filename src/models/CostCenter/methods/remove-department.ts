import { ClientSession } from 'mongoose';
import Department from 'src/models/Department';
import ValidationError from 'src/util/Error/validation-error';
import CostCenter from '..';
import { CostCenterModel } from '../schema';

export default async function removeDepartment (costCenterId: string, departmentId: string, session?: ClientSession): Promise<boolean> {
  if (!costCenterId || !departmentId) {
    throw new ValidationError('ID_REQUIRED');
  }

  const costCenterExists = await CostCenter.existsById(costCenterId, session);
  if (!costCenterExists) {
    throw new ValidationError('COST_CENTER_NOT_FOUND');
  }

  const departmentExists = await Department.existsById(departmentId, session);
  if (!departmentExists) {
    throw new ValidationError('DEPARTMENT_NOT_FOUND');
  }

  const alreadyHasDepartment = await CostCenter.hasDepartment(costCenterId, departmentId, session);
  if (!alreadyHasDepartment) {
    throw new ValidationError('DEPARTMENT_NOT_FOUND');
  }

  await CostCenterModel.findOneAndUpdate(
    { _id: costCenterId },
    {
      $pull: {
        departmentList: departmentId,
      },
    },
    {
      session: session,
    },
  ).exec();

  return true;
}
