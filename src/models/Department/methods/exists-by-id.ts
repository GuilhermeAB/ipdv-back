import { DepartmentModel } from '../schema';

/**
 * Check if exists by id
 *
 * @param {string} id - Identifier
 * @returns return true if exists
 */
export default async function existsById (id: string): Promise<boolean> {
  const result = await DepartmentModel.exists({ _id: id, deletedAt: undefined });

  return result;
}
