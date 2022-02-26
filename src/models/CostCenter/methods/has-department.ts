import { Client } from 'pg';
import { sqlQuery } from 'src/database/util';

export default async function hasDepartment (costCenterId: string, departmentId: string, session: Client): Promise<boolean> {
  const result = await sqlQuery({
    query: `select
      1
    from cost_center_department ccd
    where ccd.cost_center_id = $1 and ccd.department_id = $2
      limit 1
    `,
    client: session,
    params: [costCenterId, departmentId],
  });

  return !!(result && result[0]);
}
