/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from 'pg';
import sqlQuery from '../query';

export default async (options: { table: string, values: Record<string, any>, where: string, whereParams: any[], client: Client, }): Promise<any> => {
  const {
    table, values, where, whereParams, client,
  } = options;

  let query = `update ${table} set `;

  const params: any[] = [];

  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  Object.keys(values).forEach((key: string) => values[key] === undefined && delete values[key]);

  const { length } = Object.keys(values);
  Object.keys(values).forEach((key: string, index: number) => {
    const value = values[key];
    if (value !== undefined) {
      if (value instanceof Date) {
        query += `${key} = (to_timestamp(${value.getTime()} / 1000.0))`;
      } else {
        query += `${key} = $${[...whereParams, ...params].length + 1}`;
      }
      if (index < length - 1) {
        query += ', ';
      }

      if (typeof value === 'number' || value == null) {
        params.push(value);
      } else if (!(value instanceof Date)) {
        params.push(value);
      }
    }
  });
  query += ` ${where} RETURNING *;`;

  const resolve = await sqlQuery({ query: query, params: [...whereParams, ...params], client: client });
  return resolve[0];
};
