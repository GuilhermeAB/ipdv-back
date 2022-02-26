import { Client } from 'pg';
import { sqlQuery } from 'src/database/util';
import { UserType } from '..';

export default async function getList (session: Client): Promise<UserType[] | null> {
  const result = await sqlQuery({
    query: `select
      p.id, p.name, p.created_at, p.updated_at,
      pr.description as role_description
    from person p
      inner join person_role pr on pr.id = p.role_id
    `,
    client: session,
  });

  return result;
}
