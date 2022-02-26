import { DepartmentType } from '../Department';
import add from './methods/add';
import addDepartment from './methods/add-department';
import existsByDescription from './methods/exists-by-description';
import existsById from './methods/exists-by-id';
import getList from './methods/get-list';
import hasDepartment from './methods/has-department';
import remove from './methods/remove';
import removeDepartment from './methods/remove-department';
import update from './methods/update';

export type CostCenterType = {
  id?: string,
  description: string,
  departmentList?: DepartmentType[] | string[],
  createdAt?: Date,
  updatedAt?: Date,
  deletedAt?: Date,
}

export default {
  existsByDescription: existsByDescription,
  add: add,
  hasDepartment: hasDepartment,
  existsById: existsById,
  addDepartment: addDepartment,
  removeDepartment: removeDepartment,
  getList: getList,
  remove: remove,
  update: update,
};
