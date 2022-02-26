import { Client } from 'pg';
import { sqlDelete } from 'src/database/util';
import ValidationError from 'src/util/Error/validation-error';
import CostCenter from '..';

export default async function remove (costCenterId: string, session: Client): Promise<boolean> {
  const costCenterExists = await CostCenter.existsById(costCenterId, session);
  if (!costCenterExists) {
    throw new ValidationError('COST_CENTER_NOT_FOUND');
  }

  await sqlDelete({
    table: 'cost_center_department',
    where: 'where cost_center_id = $1',
    params: [costCenterId],
    client: session,
  });

  await sqlDelete({
    table: 'cost_center',
    where: 'where id = $1',
    params: [costCenterId],
    client: session,
  });

  return true;
}
