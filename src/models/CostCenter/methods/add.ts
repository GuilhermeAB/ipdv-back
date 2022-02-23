import { ClientSession } from 'mongoose';
import ValidationError from 'src/util/Error/validation-error';
import ConstCenter, { CostCenterType } from '..';
import makeCostCenter from '../model';
import { CostCenterModel } from '../schema';

export default async function add (costCenter: CostCenterType, session?: ClientSession): Promise<CostCenterType> {
  const newCostCenter = makeCostCenter(costCenter);

  const exists = await ConstCenter.existsByDescription(newCostCenter.description);
  if (exists) {
    throw new ValidationError('COST_CENTER_ALREADY_EXISTS');
  }

  const result = new CostCenterModel(newCostCenter);
  await result.validate();
  await result.save({ session: session });
  const item = result.toJSON();

  return item;
}
