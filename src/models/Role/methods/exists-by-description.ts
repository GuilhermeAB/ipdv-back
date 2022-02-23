import { RoleModel } from '../schema';

/**
 * Check if exists by description
 *
 * @param {string} description - Identifier
 * @returns return true if exists
 */
export default async function existsByDescription (description: string): Promise<boolean> {
  const result = await RoleModel.exists({ description: description });

  return result;
}
