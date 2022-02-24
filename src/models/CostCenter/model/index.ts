import { uuidValidateV4 } from 'src/util/uuid';
import ValidationError from 'src/util/Error/validation-error';
import { v4 as uuidv4 } from 'uuid';
import { CostCenterType } from '..';

export default function makeCostCenter (costCenter: CostCenterType): Readonly<CostCenterType> {
  if (costCenter._id && !uuidValidateV4(costCenter._id)) {
    throw new ValidationError('ID_INVALID');
  }

  if (!costCenter.description) {
    throw new ValidationError('DESCRIPTION_REQUIRED');
  }

  if (costCenter.description.length < 3) {
    throw new ValidationError('DESCRIPTION_MIN_LENGTH', { value: 3 });
  }
  if (costCenter.description.length > 50) {
    throw new ValidationError('DESCRIPTION_MAX_LENGTH', { value: 50 });
  }

  return Object.freeze({
    _id: costCenter._id || uuidv4(),
    description: costCenter.description,
    departmentList: costCenter.departmentList,
  });
}
