import { Client } from 'pg';
import { sqlDelete } from 'src/database/util';
import Department from 'src/models/Department';
import ValidationError from 'src/util/Error/validation-error';
import CostCenter from '..';

export default async function removeDepartment (costCenterId: string, departmentId: string, session: Client): Promise<boolean> {
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

  await sqlDelete({
    table: 'cost_center_department',
    where: 'where cost_center_id = $1 and department_id = $2',
    params: [costCenterId, departmentId],
    client: session,
  });

  return true;
}
