import { Client } from 'pg';
import { sqlQuery } from 'src/database/util';

/**
 * Check if exists by description
 *
 * @param {string} description - Identifier
 * @returns return true if exists
 */
export default async function existsByDescription (description: string, session: Client): Promise<boolean> {
  const result = await sqlQuery({
    query: `select
      1
    from cost_center
    where description = $1
      limit 1
    `,
    client: session,
    params: [description],
  });

  return !!(result && result[0]);
}
