import remove from './delete/remove';
import getById from './get/get-by-id';
import getList from './get/get-list';
import add from './post/add';
import update from './put/update';

export default {
  post: {
    add: add,
  },
  put: {
    update: update,
  },
  delete: {
    delete: remove,
  },
  get: {
    getList: getList,
    getById: getById,
  },
};
