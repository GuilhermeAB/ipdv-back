import { Client } from 'pg';
import { sqlInsert } from 'src/database/util';
import Department from 'src/models/Department';
import ValidationError from 'src/util/Error/validation-error';
import CostCenter from '..';

export default async function addDepartment (costCenterId: string, departmentId: string, session: Client): Promise<boolean> {
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
  if (alreadyHasDepartment) {
    throw new ValidationError('COST_CENTER_ALREADY_HAS_DEPARTMENT');
  }

  await sqlInsert({
    table: 'cost_center_department',
    values: {
      cost_center_id: costCenterId,
      department_id: departmentId,
    },
    client: session,
  });

  return true;
}
