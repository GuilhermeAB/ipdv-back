import { CostCenterModel } from '../schema';

export default async function hasDepartment (costCenterId: string, departmentId: string): Promise<boolean> {
  const result = await CostCenterModel.exists({
    _id: costCenterId,
    'departmentList.$': departmentId,
  });

  return result;
}
