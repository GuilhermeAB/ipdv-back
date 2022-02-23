import add from './methods/add';
import existsById from './methods/exists-by-id';
import existsByName from './methods/exists-by-name';
import getById from './methods/get-by-id';
import getList from './methods/get-list';
import remove from './methods/remove';
import update from './methods/update';

export type UserType = {
  _id?: string,
  name: string,
  role: string,
  createdAt?: Date,
  updatedAt?: Date,
  deletedAt?: Date,
}

export default {
  existsByName: existsByName,
  existsById: existsById,
  add: add,
  getList: getList,
  getById: getById,
  remove: remove,
  update: update,
};
