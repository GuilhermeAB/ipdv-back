import { Client } from 'pg';
import { sqlQuery } from 'src/database/util';
import { DepartmentType } from '..';

export default async function getById (id: string, session: Client): Promise<DepartmentType | null> {
  const result = await sqlQuery({
    query: `select
      id, description, created_at, updated_at
    from department
    where id = $1
      limit 1
    `,
    client: session,
    params: [id],
  });

  const department = result && result[0];

  if (department) {
    const userList = await sqlQuery({
      query: `select
        p.id, p.name, p.created_at, p.updated_at
      from department_person dp
        inner join person p on p.id = dp.person_id
      where dp.department_id = $1
      `,
      client: session,
      params: [id],
    });

    department.usersList = userList;
  }

  return department;
}
