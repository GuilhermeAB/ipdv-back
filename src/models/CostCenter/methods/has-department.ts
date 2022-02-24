import { ClientSession } from 'mongoose';
import { CostCenterModel } from '../schema';

export default async function hasDepartment (costCenterId: string, departmentId: string, session?: ClientSession): Promise<boolean> {
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
    {
      session: session,
    },
  ).exec();

  return !!(result && result.departmentList?.length);
}
