import type { httpResponse } from 'src/types/responseType';
import { httpStatusCodes } from './httpStatusCode';

const badRequest = (body: string): httpResponse<string> => {
  return {
    statusCode: httpStatusCodes.BAD_REQUEST,
    body,
  };
};

const OK = (body: any): httpResponse<any> => {
  return {
    statusCode: httpStatusCodes.OK,
    body,
  };
};

const created = (body: any): httpResponse<any> => {
  return {
    statusCode: httpStatusCodes.CREATED,
    body,
  };
};

const notFound = (): httpResponse<string> => {
  return {
    statusCode: httpStatusCodes.NOT_FOUND,
    body: 'Friend cannot be found.',
  };
};

const serverError = (): httpResponse<string> => {
  return {
    statusCode: 500,
    body: 'Something went wrong.',
  };
};

const conflict = (): httpResponse<string> => {
  return {
    statusCode: httpStatusCodes.CONFLICT,
    body: 'This Friend already exists.',
  };
};

export { badRequest, OK, notFound, created, serverError, conflict };
