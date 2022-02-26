import { UserType } from '../User';
import add from './methods/add';
import addUser from './methods/add-user';
import existsByDescription from './methods/exists-by-description';
import existsById from './methods/exists-by-id';
import getById from './methods/get-by-id';
import getList from './methods/get-list';
import hasUser from './methods/has-user';
import remove from './methods/remove';
import removeUser from './methods/remove-user';
import update from './methods/update';

export type DepartmentType = {
  id?: string,
  description: string,
  userList?: UserType[] | string[],
  createdAt?: Date,
  updatedAt?: Date,
  deletedAt?: Date,
}

export default {
  existsByDescription: existsByDescription,
  existsById: existsById,
  add: add,
  getList: getList,
  getById: getById,
  hasUser: hasUser,
  addUser: addUser,
  removeUser: removeUser,
  remove: remove,
  update: update,
};
