import { ClientSession } from 'mongoose';
import ValidationError from 'src/util/Error/validation-error';
import CostCenter, { CostCenterType } from '..';
import makeCostCenter from '../model';
import { CostCenterModel } from '../schema';

export default async function update (costCenter: CostCenterType, session?: ClientSession): Promise<CostCenterType> {
  const newCostCenter = makeCostCenter(costCenter);

  const exists = await CostCenter.existsById(newCostCenter._id!);
  if (!exists) {
    throw new ValidationError('COST_CENTER_NOT_FOUND');
  }

  const result = await CostCenterModel.findOneAndUpdate(
    { _id: newCostCenter._id },
    {
      $set: {
        description: newCostCenter.description,
      },
    },
    {
      new: true,
      session: session,
    },
  ).exec();

  return result.toJSON();
}
