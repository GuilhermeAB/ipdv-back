import { Client } from 'pg';
import { sqlQuery } from 'src/database/util';
import { RoleType } from '..';

/**
 * Get roles
 *
 * @param {ClientSession} session - Session
 * @returns Returns roles or null
 */
export default async function getList (session: Client): Promise<RoleType[] | null> {
  const result = await sqlQuery({
    query: `select
      id, description, created_at, updated_at
    from person_role
    `,
    client: session,
  });

  return result;
}
