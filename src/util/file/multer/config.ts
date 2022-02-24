/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';
import multer, { diskStorage } from 'multer';
import ValidationError from 'src/util/Error/validation-error';
import { MulterFile } from '.';

export const FILE_MAX_SIZE = {
  ONE_MEGABYTES: 1 * 1024 * 1024,
  TWO_MEGABYTES: 2 * 1024 * 1024,
};

const allowedMimeTypes = [
  'text/csv',
];

const fileFolderPath = resolve(__dirname, '..', '..', '..', '..', 'files');

const multerConfig: multer.Options = {
  dest: fileFolderPath,
  storage: diskStorage({
    destination: (_request: any, _file: MulterFile, cb: any) => {
      cb(null, fileFolderPath);
    },
    filename: (_request: any, _file: MulterFile, cb: any) => {
      const filename = `${uuidv4()}.csv`;

      cb(null, filename);
    },
  }),
  limits: {
    fileSize: FILE_MAX_SIZE.TWO_MEGABYTES,
  },
  fileFilter: (request: any, file: Express.Multer.File, cb: any): any => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new ValidationError('INVALID_FILE_TYPE'));
    }
  },
};

export default multerConfig;
