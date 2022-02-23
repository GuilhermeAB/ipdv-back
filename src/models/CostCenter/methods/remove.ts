import { ClientSession } from 'mongoose';
import ValidationError from 'src/util/Error/validation-error';
import CostCenter, { CostCenterType } from '..';
import { CostCenterModel } from '../schema';

export default async function remove (costCenterId: string, session?: ClientSession): Promise<CostCenterType> {
  const costCenterExists = await CostCenter.existsById(costCenterId);
  if (!costCenterExists) {
    throw new ValidationError('COST_CENTER_NOT_FOUND');
  }

  const result = await CostCenterModel.findOneAndUpdate(
    { _id: costCenterId },
    {
      $set: {
        deletedAt: new Date(),
      },
    },
    {
      new: true,
      session: session,
    },
  ).exec();

  return result.toJSON();
}
