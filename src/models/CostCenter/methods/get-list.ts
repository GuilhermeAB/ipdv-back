/* eslint-disable no-param-reassign */
import { Client } from 'pg';
import { sqlQuery } from 'src/database/util';
import { CostCenterType } from '..';

/**
 * Get list
 *
 * @param {ClientSession} session - Session
 * @returns Returns list or null
 */
export default async function getList (session: Client): Promise<CostCenterType[] | null> {
  const result = await sqlQuery({
    query: `select
      id, description, created_at, updated_at
    from cost_center
    `,
    client: session,
  });

  const costCenters = result;

  if (costCenters && costCenters.length) {
    const departmentList: Promise<void>[] = [];

    costCenters.forEach((item: CostCenterType) => {
      departmentList.push(sqlQuery({
        query: `select
          d.id, d.description, d.created_at, d.updated_at
        from cost_center_department ccd
          inner join department d on d.id = ccd.department_id
        where ccd.cost_center_id = $1
        `,
        params: [item.id],
        client: session,
      }).then((resolve) => {
        item.departmentList = resolve;
      }));
    });

    await Promise.all(departmentList);
  }

  return costCenters;
}
