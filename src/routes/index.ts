import type { Request, Response } from 'express';
import { Router } from 'express';
import Department from 'src/controllers/Department';
import Role from 'src/controllers/Role';
import User from 'src/controllers/User';
import CostCenter from 'src/controllers/CostCenter';
import init from 'src/util/router';
// import { auth } from './middlewares';
import makeExpressCallback from './util/make-express-callback';

const routes = Router();

init(routes);

routes.get('/', (_request: Request, response: Response) => response.json({ message: 'Hello there' }));

// ///////////////////////////////////////////////////////////////////////////////
// Role
// ///////////////////////////////////////////////////////////////////////////////

routes.post('/role',
  Role.post.add.validation,
  makeExpressCallback(Role.post.add.method));

routes.get('/role', makeExpressCallback(Role.get.getList.method));

// ///////////////////////////////////////////////////////////////////////////////
// User
// ///////////////////////////////////////////////////////////////////////////////

/**
 * POST /user
 *
 * Create a new user
 */
routes.post('/user',
  User.post.add.validation,
  makeExpressCallback(User.post.add.method));

routes.put('/user/:id',
  User.put.update.validation,
  makeExpressCallback(User.put.update.method));

routes.delete('/user/:id',
  User.delete.delete.validation,
  makeExpressCallback(User.delete.delete.method));

routes.get('/user', makeExpressCallback(User.get.getList.method));

routes.get('/user/:id',
  User.get.getById.validation,
  makeExpressCallback(User.get.getById.method));

// ///////////////////////////////////////////////////////////////////////////////
// Department
// ///////////////////////////////////////////////////////////////////////////////

routes.post('/department',
  Department.post.add.validation,
  makeExpressCallback(Department.post.add.method));

routes.post('/department/:id',
  Department.post.addUser.validation,
  makeExpressCallback(Department.post.addUser.method));

routes.patch('/department/:id',
  Department.patch.update.validation,
  makeExpressCallback(Department.patch.update.method));

routes.delete('/department/:id',
  Department.delete.delete.validation,
  makeExpressCallback(Department.delete.delete.method));

routes.delete('/department/:id/:userId',
  Department.delete.removeUser.validation,
  makeExpressCallback(Department.delete.removeUser.method));

routes.get('/department', makeExpressCallback(Department.get.getList.method));

routes.get('/department/:id',
  Department.get.getById.validation,
  makeExpressCallback(Department.get.getById.method));

// ///////////////////////////////////////////////////////////////////////////////
// Cost Center
// ///////////////////////////////////////////////////////////////////////////////

routes.post('/cost-center',
  CostCenter.post.add.validation,
  makeExpressCallback(CostCenter.post.add.method));

routes.post('/cost-center/:id',
  CostCenter.post.addDepartment.validation,
  makeExpressCallback(CostCenter.post.addDepartment.method));

routes.patch('/cost-center/:id',
  CostCenter.patch.update.validation,
  makeExpressCallback(CostCenter.patch.update.method));

routes.get('/cost-center', makeExpressCallback(CostCenter.get.getList.method));

routes.delete('/cost-center/:id',
  CostCenter.delete.delete.validation,
  makeExpressCallback(CostCenter.delete.delete.method));

routes.delete('/cost-center/:id/:departmentId',
  CostCenter.delete.removeDepartment.validation,
  makeExpressCallback(CostCenter.delete.removeDepartment.method));

export default routes;
