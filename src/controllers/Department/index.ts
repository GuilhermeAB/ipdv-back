import update from './patch/update';
import add from './post/add';
import remove from './delete/remove';
import getList from './get/get-list';
import getById from './get/get-by-id';
import removeUser from './delete/remove-user';
import addUser from './post/add-user';

export default {
  post: {
    add: add,
    addUser: addUser,
  },
  patch: {
    update: update,
  },
  delete: {
    delete: remove,
    removeUser: removeUser,
  },
  get: {
    getList: getList,
    getById: getById,
  },
};
