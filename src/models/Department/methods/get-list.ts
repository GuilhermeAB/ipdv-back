/* eslint-disable no-param-reassign */
import { Client } from 'pg';
import { sqlQuery } from 'src/database/util';
import { DepartmentType } from '..';

/**
 * Get departments
 *
 * @param {ClientSession} session - Session
 * @returns Returns departments or null
 */
export default async function getList (session: Client): Promise<DepartmentType[] | null> {
  const result = await sqlQuery({
    query: `select
      id, description, created_at, updated_at
    from department
    `,
    client: session,
  });

  const departments = result;

  if (departments && departments.length) {
    const userList: Promise<void>[] = [];

    departments.forEach((item: DepartmentType) => {
      userList.push(sqlQuery({
        query: `select
          p.id, p.name, p.created_at, p.updated_at,
          pr.description as role_description
        from department_person dp
          inner join person p on p.id = dp.person_id
          left join person_role pr on pr.id = p.role_id
        where dp.department_id = $1
        `,
        client: session,
        params: [item.id],
      }).then((resolve) => {
        item.userList = resolve;
      }));
    });

    await Promise.all(userList);
  }

  return departments;
}
