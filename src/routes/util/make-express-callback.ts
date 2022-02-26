import type {
  NextFunction, Request, RequestHandler, Response,
} from 'express';
import { validationResult } from 'express-validator';
import ValidationError from 'src/util/Error/validation-error';
import { removeFile } from 'src/util/file';
import type { ParamsType } from 'src/util/i18n/methods/get-message';
import {
  Pool, ClientConfig, Client,
} from 'pg';
import { config } from 'dotenv';

config();

const databaseConfig: ClientConfig = {
  user: process.env.DATABASE_USER_USERNAME,
  password: process.env.DATABASE_USER_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  port: parseInt(process.env.DATABASE_PORT!, 10),
};

const pool = new Pool(databaseConfig);

const DEFAULT_INTERNAL_ERROR = {
  messages: {
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An internal error occurred',
    },
  },
};

export type CallBackType = (request: Request, response: Response, session: Client) => Promise<Response>;
type validationResultErrorType = {
  msg: {
    code: string,
    message: string,
    params: ParamsType
  }
};

export default (callback: CallBackType): RequestHandler => async (request: Request, response: Response, next: NextFunction): Promise<Response> => {
  let session;

  let logError;
  try {
    // Request parameter validation
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      logError = {
        messages: {
          errors: errors.array({ onlyFirstError: true }).map((error: validationResultErrorType) => ({
            code: error.msg.code,
            message: error.msg.message,
            params: error.msg.params,
          })),
        },
      };

      return response.status(400).json(logError);
    }

    session = await pool.connect();
    await session.query('BEGIN');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await callback(request, response, session as any);

    if (session) {
      await session.query('COMMIT');
    }

    return result;
  } catch (e) {
    if (session) {
      await session.query('ROLLBACK');
    }

    if (e instanceof ValidationError) {
      logError = {
        messages: {
          error: {
            code: e.getCode(),
            message: e.getMessage(),
            params: e.getParams(),
          },
        },
      };

      return response.status(400).json(logError);
    }

    logError = DEFAULT_INTERNAL_ERROR;

    next(e);

    return response.status(500).json(logError);
  } finally {
    if (session) {
      session.release();
    }

    if (request.file) {
      const {
        destination,
        filename,
      } = request.file;

      const path = `${destination}/${filename}`;
      removeFile(path);
    }
  }
};
