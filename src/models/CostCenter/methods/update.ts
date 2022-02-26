import { Client } from 'pg';
import { sqlUpdate } from 'src/database/util';
import ValidationError from 'src/util/Error/validation-error';
import CostCenter, { CostCenterType } from '..';
import makeCostCenter from '../model';

export default async function update (costCenter: CostCenterType, session: Client): Promise<CostCenterType> {
  const newCostCenter = makeCostCenter(costCenter);

  const exists = await CostCenter.existsById(newCostCenter.id!, session);
  if (!exists) {
    throw new ValidationError('COST_CENTER_NOT_FOUND');
  }

  const result = await sqlUpdate({
    table: 'cost_center',
    values: {
      description: newCostCenter.description,
      updated_at: new Date(),
    },
    where: 'where id = $1',
    whereParams: [newCostCenter.id],
    client: session,
  });

  return result;
}
