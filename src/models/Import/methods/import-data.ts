import { MulterFile } from 'src/util/file/multer';
import csv from 'csvtojson';
import Ajv, { JSONSchemaType } from 'ajv';
import ValidationError from 'src/util/Error/validation-error';
import Role, { RoleType } from 'src/models/Role';
import User, { UserType } from 'src/models/User';
import Department, { DepartmentType } from 'src/models/Department';
import CostCenter from 'src/models/CostCenter';
import { Client } from 'pg';

type CsvFileType = {
  USER_NAME: string,
  USER_ROLE: string,
  DEPARTMENT: string,
  COST_CENTER: string,
}

function fileIsValid (data: Record<string, string>[]): boolean {
  const ajv = new Ajv();

  const schema: JSONSchemaType<CsvFileType[]> = {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        USER_NAME: { type: 'string' },
        USER_ROLE: { type: 'string' },
        DEPARTMENT: { type: 'string' },
        COST_CENTER: { type: 'string' },
      },
      required: ['USER_NAME', 'USER_ROLE', 'DEPARTMENT', 'COST_CENTER'],
      additionalProperties: false,
    },
  };
  const validate = ajv.compile(schema);

  return validate(data);
}

async function importRoles (list: string[], session: Client): Promise<RoleType[]> {
  const resultList = list.map((item: string) => Role.add({ description: item }, session));
  const result = await Promise.all(resultList);

  return result;
}

async function importUsers (list: CsvFileType[], userList: string[], roles: RoleType[], session: Client): Promise<UserType[]> {
  const resultList = userList.map((name: string) => {
    const user = list.find((i) => i.USER_NAME === name);
    if (!user) {
      throw new ValidationError('IMPORT_USER_NOT_FOUND', { value: name });
    }

    const role = roles.find((i) => i.description === user.USER_ROLE);

    return User.add({
      name: name,
      role_id: role!.id!,
    }, session);
  });

  const result = await Promise.all(resultList);

  return result;
}

async function importDepartments (list: CsvFileType[], departmentList: string[], users: UserType[], session: Client): Promise<DepartmentType[]> {
  const resultList = departmentList.map((description: string) => {
    const userList = list
      .filter((i) => i.DEPARTMENT === description)
      .map((i) => i.USER_NAME);
    const userIdList = users
      .filter((i) => userList.includes(i.name))
      .map((i) => i.id!);

    return Department.add({
      description: description,
      userList: userIdList,
    }, session);
  });

  const result = await Promise.all(resultList);

  return result;
}

async function importCostCenters (list: CsvFileType[], costCenterList: string[], departments: DepartmentType[], session: Client): Promise<DepartmentType[]> {
  const resultList = costCenterList.map((description: string) => {
    const departmentList = list
      .filter((i) => i.COST_CENTER === description)
      .map((i) => i.DEPARTMENT);
    const departmentIdList = departments
      .filter((i) => departmentList.includes(i.description))
      .map((i) => i.id!);

    return CostCenter.add({
      description: description,
      departmentList: departmentIdList,
    }, session);
  });

  const result = await Promise.all(resultList);

  return result;
}

export default async function importData (file: MulterFile, session: Client): Promise<boolean> {
  if (!file) {
    throw new ValidationError('FILE_REQUIRED');
  }

  const list = await csv().fromFile(file.path);

  if (!fileIsValid(list) || !list.length) {
    throw new ValidationError('INVALID_FILE');
  }

  const userList = [...new Set(list.map((item: CsvFileType) => item.USER_NAME))];
  const userRoleList = [...new Set(list.map((item: CsvFileType) => item.USER_ROLE))];
  const departmentList = [...new Set(list.map((item: CsvFileType) => item.DEPARTMENT))];
  const costCenterList = [...new Set(list.map((item: CsvFileType) => item.COST_CENTER))];

  const roles = await importRoles(userRoleList as string[], session);
  const users = await importUsers(list, userList as string[], roles, session);
  const departments = await importDepartments(list, departmentList as string[], users, session);
  await importCostCenters(list, costCenterList as string[], departments, session);

  return true;
}
