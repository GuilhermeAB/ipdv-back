import { UserModel } from '../schema';

/**
 * Check if exists by name
 *
 * @param {string} name - Identifier
 * @returns return true if exists
 */
export default async function existsByName (name: string): Promise<boolean> {
  const result = await UserModel.exists({ name: name });

  return result;
}
