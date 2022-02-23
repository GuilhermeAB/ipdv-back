import { DepartmentModel } from '../schema';

export default async function hasUser (departmentId: string, userId: string): Promise<boolean> {
  const result = await DepartmentModel.findOne(
    { _id: departmentId },
    {
      userList: {
        $elemMatch: {
          $eq: userId,
        },
      },
      _id: 0,
    },
  ).exec();

  return !!(result && result.userList?.length);
}
