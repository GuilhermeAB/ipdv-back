import { CostCenterModel } from '../schema';

export default async function hasDepartment (costCenterId: string, departmentId: string): Promise<boolean> {
  const result = await CostCenterModel.findOne(
    { _id: costCenterId },
    {
      departmentList: {
        $elemMatch: {
          $eq: departmentId,
        },
      },
      _id: 0,
    },
  ).exec();

  return !!(result && result.departmentList?.length);
}
