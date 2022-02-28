import add from './post/add';
import getList from './get/get-list';
import addDepartment from './post/add-department';
import remove from './delete/remove';
import removeDepartment from './delete/remove-department';
import update from './patch/update';
import getById from './get/get-by-id';

export default {
  post: {
    add: add,
    addDepartment: addDepartment,
  },
  patch: {
    update: update,
  },
  get: {
    getList: getList,
    getById: getById,
  },
  delete: {
    delete: remove,
    removeDepartment: removeDepartment,
  },
};
