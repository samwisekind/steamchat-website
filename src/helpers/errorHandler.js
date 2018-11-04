import { ERRORS } from 'helpers/constants';

const errorHandler = (status = 500) => {
  let message;
  let code;

  switch (parseInt(status, 10)) {
    case 400:
      message = 'Invalid Request';
      code = ERRORS.INVALID_REQUEST;
      break;
    case 404:
      message = 'Not Found';
      code = ERRORS.NOT_FOUND;
      break;
    case 500:
    default:
      message = 'Internal Server Error';
      code = ERRORS.SERVER_ERROR;
      break;
  }

  return { message, code };
};

export default errorHandler;
