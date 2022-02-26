import { Client } from 'pg';
import { sqlQuery } from 'src/database/util';

/**
 * Check if exists by name
 *
 * @param {string} name - Identifier
 * @returns return true if exists
 */
export default async function existsByName (name: string, session: Client): Promise<boolean> {
  const result = await sqlQuery({
    query: `select
      1
    from person
    where name = $1
      limit 1
    `,
    client: session,
    params: [name],
  });

  return !!(result && result[0]);
}
