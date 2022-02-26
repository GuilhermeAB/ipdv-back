import { Client } from 'pg';
import { sqlQuery } from 'src/database/util';

/**
 * Check if exists by id
 *
 * @param {string} id - Identifier
 * @returns return true if exists
 */
export default async function existsById (id: string, session: Client): Promise<boolean> {
  const result = await sqlQuery({
    query: `select
      1
    from person_role
    where id = $1
      limit 1
    `,
    client: session,
    params: [id],
  });

  return !!(result && result[0]);
}
