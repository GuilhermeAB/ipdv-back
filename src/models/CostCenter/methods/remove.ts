import { ClientSession } from 'mongoose';
import ValidationError from 'src/util/Error/validation-error';
import CostCenter from '..';
import { CostCenterModel } from '../schema';

export default async function remove (costCenterId: string, session?: ClientSession): Promise<boolean> {
  const costCenterExists = await CostCenter.existsById(costCenterId);
  if (!costCenterExists) {
    throw new ValidationError('COST_CENTER_NOT_FOUND');
  }

  await CostCenterModel.deleteOne(
    { _id: costCenterId },
    {
      session: session,
    },
  ).exec();

  return true;
}
