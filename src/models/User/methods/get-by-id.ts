import { Client } from 'pg';
import { sqlQuery } from 'src/database/util';
import { UserType } from '..';

export default async function getById (id: string, session: Client): Promise<UserType | null> {
  const result = await sqlQuery({
    query: `select
      p.id, p.name, p.created_at, p.updated_at,
      pr.description as role_description, pr.id as role_id
    from person p
      inner join person_role pr on pr.id = p.role_id
    where p.id = $1
      limit 1
    `,
    client: session,
    params: [id],
  });

  return result && result[0];
}
