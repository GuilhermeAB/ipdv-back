import { CostCenterModel } from '../schema';

/**
 * Check if exists by description
 *
 * @param {string} description - Identifier
 * @returns return true if exists
 */
export default async function existsByDescription (description: string): Promise<boolean> {
  const result = await CostCenterModel.exists({ description: description });

  return result;
}
