import { Client } from 'pg';
import { sqlInsert } from 'src/database/util';
import ValidationError from 'src/util/Error/validation-error';
import ConstCenter, { CostCenterType } from '..';
import makeCostCenter from '../model';
import addDepartment from './add-department';

export default async function add (costCenter: CostCenterType, session: Client): Promise<CostCenterType> {
  const newCostCenter = makeCostCenter(costCenter);

  const exists = await ConstCenter.existsByDescription(newCostCenter.description, session);
  if (exists) {
    throw new ValidationError('COST_CENTER_ALREADY_EXISTS');
  }

  const result = await sqlInsert({
    table: 'cost_center',
    values: {
      id: newCostCenter.id,
      description: newCostCenter.description,
      created_at: new Date(),
    },
    client: session,
  });

  if (newCostCenter.departmentList && newCostCenter.departmentList.length) {
    const departmentList = (newCostCenter.departmentList as string[]).map((item) => addDepartment(newCostCenter.id!, item, session));
    await Promise.all(departmentList);
  }

  return result;
}
