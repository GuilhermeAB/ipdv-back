import { Request, Response } from 'express';
import { Client } from 'pg';
import ImportData from 'src/models/Import';
import { MulterFile } from 'src/util/file/multer';

async function method (request: Request, response: Response, session: Client): Promise<Response> {
  const file = request.file as MulterFile;

  const result = await ImportData.importData(file, session);

  return response.success({
    result: result,
  }, 'ITEM_ADDED');
}

export default {
  method: method,
};
