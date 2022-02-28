import type { Request, Response } from 'express';
import { Router } from 'express';
import Department from 'src/controllers/Department';
import Role from 'src/controllers/Role';
import User from 'src/controllers/User';
import CostCenter from 'src/controllers/CostCenter';
import init from 'src/util/router';
import multer from 'multer';
import multerConfig from 'src/util/file/multer/config';
import Import from 'src/controllers/Import';
import Auth from 'src/controllers/Auth';
import { auth } from './middlewares';
import makeExpressCallback from './util/make-express-callback';

const routes = Router();

init(routes);

routes.get('/', (_request: Request, response: Response) => response.json({ message: 'Hello there' }));

// ///////////////////////////////////////////////////////////////////////////////
// Authentication
// ///////////////////////////////////////////////////////////////////////////////

/**
 * GET /auth
 *
 * Get authentication (token/cookies)
 */
routes.get('/auth', makeExpressCallback(Auth.get.getToken.method));

// ///////////////////////////////////////////////////////////////////////////////
// Role
// ///////////////////////////////////////////////////////////////////////////////

/**
 * POST /role
 *
 * Create a new role
 */
routes.post(
  '/role',
  auth.isAuthenticated,
  Role.post.add.validation,
  makeExpressCallback(Role.post.add.method),
);

/**
 * GET /role
 *
 * Get roles
 */
routes.get(
  '/role',
  auth.isAuthenticated,
  makeExpressCallback(Role.get.getList.method),
);

// ///////////////////////////////////////////////////////////////////////////////
// User
// ///////////////////////////////////////////////////////////////////////////////

/**
 * POST /user
 *
 * Create a new user
 */
routes.post(
  '/user',
  auth.isAuthenticated,
  User.post.add.validation,
  makeExpressCallback(User.post.add.method),
);

/**
 * PUT /user/:id
 *
 * Update user
 */
routes.put(
  '/user/:id',
  auth.isAuthenticated,
  User.put.update.validation,
  makeExpressCallback(User.put.update.method),
);

/**
 * DELETE /user/:id
 *
 * Delete a user
 */
routes.delete(
  '/user/:id',
  auth.isAuthenticated,
  User.delete.delete.validation,
  makeExpressCallback(User.delete.delete.method),
);

/**
 * GEt /user
 *
 * Get users
 */
routes.get(
  '/user',
  auth.isAuthenticated,
  makeExpressCallback(User.get.getList.method),
);

/**
 * GET /user/:id
 *
 * Get user by id
 */
routes.get(
  '/user/:id',
  auth.isAuthenticated,
  User.get.getById.validation,
  makeExpressCallback(User.get.getById.method),
);

// ///////////////////////////////////////////////////////////////////////////////
// Department
// ///////////////////////////////////////////////////////////////////////////////

/**
 * POST /department
 *
 * Create a new department
 */
routes.post(
  '/department',
  auth.isAuthenticated,
  Department.post.add.validation,
  makeExpressCallback(Department.post.add.method),
);

/**
 * POST /department/:id
 *
 * Add user to department
 */
routes.post(
  '/department/:id',
  auth.isAuthenticated,
  Department.post.addUser.validation,
  makeExpressCallback(Department.post.addUser.method),
);

/**
 * PATCH /department/:id
 *
 * Update department
 */
routes.patch(
  '/department/:id',
  auth.isAuthenticated,
  Department.patch.update.validation,
  makeExpressCallback(Department.patch.update.method),
);

/**
 * DELETE /department/:id
 *
 * Delete department
 */
routes.delete(
  '/department/:id',
  auth.isAuthenticated,
  Department.delete.delete.validation,
  makeExpressCallback(Department.delete.delete.method),
);

/**
 * DELETE /department/:id/:userId
 *
 * Remove user from department
 */
routes.delete(
  '/department/:id/:userId',
  auth.isAuthenticated,
  Department.delete.removeUser.validation,
  makeExpressCallback(Department.delete.removeUser.method),
);

/**
 * GET /department
 *
 * Get department list
 */
routes.get(
  '/department',
  auth.isAuthenticated,
  makeExpressCallback(Department.get.getList.method),
);

/**
 * GET /department/:id
 *
 * Get department by id
 */
routes.get(
  '/department/:id',
  auth.isAuthenticated,
  Department.get.getById.validation,
  makeExpressCallback(Department.get.getById.method),
);

// ///////////////////////////////////////////////////////////////////////////////
// Cost Center
// ///////////////////////////////////////////////////////////////////////////////

/**
 * POST /cost-center
 *
 * Create a new cost center
 */
routes.post(
  '/cost-center',
  auth.isAuthenticated,
  CostCenter.post.add.validation,
  makeExpressCallback(CostCenter.post.add.method),
);

/**
 * POST /cost-center/:id
 *
 * Add department to cost center
 */
routes.post(
  '/cost-center/:id',
  auth.isAuthenticated,
  CostCenter.post.addDepartment.validation,
  makeExpressCallback(CostCenter.post.addDepartment.method),
);

/**
 * PATCH /cost-center/:id
 *
 * Update cost center
 */
routes.patch(
  '/cost-center/:id',
  auth.isAuthenticated,
  CostCenter.patch.update.validation,
  makeExpressCallback(CostCenter.patch.update.method),
);

/**
 * GET /cost-center
 *
 * Get cost center list
 */
routes.get(
  '/cost-center',
  auth.isAuthenticated,
  makeExpressCallback(CostCenter.get.getList.method),
);

/**
 * GET /cost-center/:id
 *
 * Get cost center by id
 */
routes.get(
  '/cost-center/:id',
  auth.isAuthenticated,
  CostCenter.get.getById.validation,
  makeExpressCallback(CostCenter.get.getById.method),
);

/**
 * DELETE /cost-center/:id
 *
 * Remove a cost center
 */
routes.delete(
  '/cost-center/:id',
  auth.isAuthenticated,
  CostCenter.delete.delete.validation,
  makeExpressCallback(CostCenter.delete.delete.method),
);

/**
 * DELETE /cost-center/:id/:departmentId
 *
 * Remove department from cost center
 */
routes.delete(
  '/cost-center/:id/:departmentId',
  auth.isAuthenticated,
  CostCenter.delete.removeDepartment.validation,
  makeExpressCallback(CostCenter.delete.removeDepartment.method),
);

// ///////////////////////////////////////////////////////////////////////////////
// Import
// ///////////////////////////////////////////////////////////////////////////////

/**
 * POST /import
 *
 * Import by file
 */
routes.post(
  '/import',
  auth.isAuthenticated,
  multer(multerConfig).single('file'),
  makeExpressCallback(Import.import.importData.method),
);

export default routes;
