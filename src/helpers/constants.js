const QUERYFILTER = '-_id -active -createdAt -updatedAt -__v';

const ERRORS = {
  SERVER_ERROR: 'The server encountered an internal error or misconfiguration and was unable to complete your request.',
  NOT_FOUND: 'The requested resource was not found, or has been moved or deleted.',
  INVALID_REQUEST: 'Your request was invalid and could not be completed.',
};

module.exports = { QUERYFILTER, ERRORS };
