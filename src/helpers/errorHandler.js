const { ERRORS } = require('../helpers/constants');

/**
 * Returns HTTP status code and message based on error message
 * @param {Object}
 * @returns {Object}
 */
const errorHandler = ({ message = '500' }) => {
  let text;
  let status = message;

  switch (parseInt(status, 10)) {
    case 400:
      text = ERRORS.INVALID_REQUEST;
      break;
    case 404:
      text = ERRORS.NOT_FOUND;
      break;
    case 500:
    default:
      text = ERRORS.SERVER_ERROR;
      status = 500;
      break;
  }

  return { status, message: text };
};

module.exports = errorHandler;
