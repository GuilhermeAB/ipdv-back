import { Client } from 'pg';
import { sqlQuery } from 'src/database/util';

export default async function hasUser (departmentId: string, userId: string, session: Client): Promise<boolean> {
  const result = await sqlQuery({
    query: `select
      1
    from department_person dp
    where dp.department_id = $1 and dp.person_id = $2
      limit 1
    `,
    client: session,
    params: [departmentId, userId],
  });

  return !!(result && result[0]);
}
