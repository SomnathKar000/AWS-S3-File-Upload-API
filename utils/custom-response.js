const buildResponse = (body) => {
  return {
    statusCode: 200,
    body: JSON.stringify(body),
  };
};

const customError = (statusCode = 400, message, stack = {}) => {
  return {
    statusCode,
    body: JSON.stringify({ message, stack }),
  };
};

module.exports = { customError, buildResponse };
