import add from './methods/add';
import existsByDescription from './methods/exists-by-description';
import existsById from './methods/exists-by-id';
import getList from './methods/get-list';

export type RoleType = {
  id?: string,
  description: string,
  createdAt?: Date,
  updatedAt?: Date,
  deletedAt?: Date,
}

export default {
  existsByDescription: existsByDescription,
  existsById: existsById,
  add: add,
  getList: getList,
};
