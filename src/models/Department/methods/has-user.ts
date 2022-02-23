import { DepartmentModel } from '../schema';

export default async function hasUser (departmentId: string, userId: string): Promise<boolean> {
  const result = await DepartmentModel.exists({
    _id: departmentId,
    'userList.$': userId,
  });

  return result;
}
