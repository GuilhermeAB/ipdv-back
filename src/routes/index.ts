import type { Request, Response } from 'express';
import { Router } from 'express';
import init from 'src/util/router';
import { auth } from './middlewares';
import makeExpressCallback from './util/make-express-callback';

const routes = Router();

init(routes);

routes.get('/', (_request: Request, response: Response) => response.json({ message: 'Hello there' }));

// ///////////////////////////////////////////////////////////////////////////////
// Author
// ///////////////////////////////////////////////////////////////////////////////

/**
 * POST /author
 *
 * Create a new author
 */
// routes.post('/author',
//   auth.isAuthenticated,
//   auth.isVerified,
//   Author.post.add.validation,
//   makeExpressCallback(Author.post.add.method));

export default routes;