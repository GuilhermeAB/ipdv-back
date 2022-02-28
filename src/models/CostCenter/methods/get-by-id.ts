import { Client } from 'pg';
import { sqlQuery } from 'src/database/util';
import { CostCenterType } from '..';

export default async function getById (id: string, session: Client): Promise<CostCenterType | null> {
  const result = await sqlQuery({
    query: `select
      id, description, created_at, updated_at
    from cost_center
    where id = $1
      limit 1
    `,
    client: session,
    params: [id],
  });

  const costCenter = result && result[0];

  if (costCenter) {
    const departmentList = await sqlQuery({
      query: `select
        d.id, d.description, d.created_at, d.updated_at
      from cost_center_department dp
        inner join department d on d.id = dp.department_id
      where dp.cost_center_id = $1
      `,
      client: session,
      params: [id],
    });

    costCenter.departmentList = departmentList;
  }

  return costCenter;
}
